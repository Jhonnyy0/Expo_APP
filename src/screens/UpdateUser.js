import { StyleSheet, Text, View, Alert, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Constantes from '../utils/constantes'
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
// Import de componentes
import Input from '../components/Inputs/Input'
import Boton3 from '../components/Buttons/Button3';
import Boton5 from '../components/Buttons/Button5';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';

export default function UpdateUser({ navigation }) {

    const ip = Constantes.IP;

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [dui, setDui] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('')

    // Expresiones regulares para validar DUI y teléfono
    const duiRegex = /^\d{8}-\d$/;
    const telefonoRegex = /^\d{4}-\d{4}$/;

    // Funcion para llenar los inputs con los datos del usuario
    const fillData = async () => {
        try {
            const response = await fetch(`${ip}/expo_2024_v2/api/services/public/cliente.php?action=getUserMobile`, {
                method: 'GET'
            });

            const data = await response.json();
            console.log("Data en actualizar consultada", data);
            if (data.status) {
                console.log(data.name, 'Valor de editar perfil')
                setNombre(data.name.nombre_cliente);
                setApellido(data.name.apellido_cliente);
                setCorreo(data.name.correo_cliente);
                setFechaNacimiento(data.name.nacimiento_cliente);
                setDui(data.name.dui_cliente);
                setTelefono(data.name.telefono_cliente);
            }

            else {
                Alert.alert('Error', data.error);
            }
        }

        catch (error) {
            Alert.alert('Ocurrió un error al intentar obtener los datos del usuario');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(`${ip}/expo_2024_v2/api/services/public/cliente.php?action=logOut`, {
                method: 'GET'
            });
            const data = await response.json();
            if (data.status) {
                navigation.navigate('Sesion');
                Alert.alert('Sesion cerrada');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
        }
    };

    // Logica para cargar los datos del usuario al cargar la pantalla
    useFocusEffect(
        React.useCallback(() => {
            fillData();
        }, [])
    );

    const editProfile = async () => {
        try {
            console.log("Datos a enviar", nombre, apellido, correo, fechaNacimiento, dui, telefono)

            // Validar los campos
            if (!nombre.trim() || !apellido.trim() || !correo.trim() || !fechaNacimiento.trim() ||
                !dui.trim() || !telefono.trim()) {
                Alert.alert("Debes llenar todos los campos");
                return;
            }

            else if (!duiRegex.test(dui)) {
                Alert.alert("El DUI debe tener el formato correcto (########-#)");
                return;
            }

            else if (!telefonoRegex.test(telefono)) {
                Alert.alert("El teléfono debe tener el formato correcto (####-####)");
                return;
            }

            // Si todos los campos son válidos, proceder con la creación del usuario
            const formData = new FormData();
            formData.append('nombreCliente', nombre);
            formData.append('apellidoCliente', apellido);
            formData.append('correoCliente', correo);
            formData.append('nacimientoCliente', fechaNacimiento);
            formData.append('duiCliente', dui)
            formData.append('telefonoCliente', telefono);
            const response = await fetch(`${ip}/expo_2024_v2/api/services/public/cliente.php?action=editProfile`, {
                method: 'POST', 
                body: formData
            });

            const data = await response.json();
            console.log(data, "Data desde Editar Perfil OK")
            if (data.status) {
                console.log(data, 'Valor de editar perfil OK')
                Alert.alert('Perfil editado correctamente', '', [
                    { text: 'OK', onPress: () => fillData() },
                ], { icon: 'success' });
            }

            else {
                Alert.alert('Error', data.error);
            }
        }

        catch (error) {
            Alert.alert('Ocurrió un error al intentar crear el usuario');
        }
    };

    const volverInicio = () => {
        navigation.navigate('TabNavigator');
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        /*
        Codigo para convertir la fecha al formato año-mes-dia */

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const fechaNueva = `${year}-${month}-${day}`;
        setFechaNacimiento(fechaNueva)
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Datos del perfil</Text>
            <TouchableOpacity onPress={volverInicio} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.borderedContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Nombre(s):</Text>
                        <Input
                            setValor={nombre}
                            setTextChange={setNombre}
                            inputStyle={{
                                backgroundColor: '#151515', borderBottomWidth: 1, padding: 2,
                                borderBottomColor: '#FFF', borderRadius: 0, paddingHorizontal: 10,
                            }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Apellido(s):</Text>
                        <Input
                            setValor={apellido}
                            setTextChange={setApellido}
                            inputStyle={{
                                backgroundColor: '#151515', borderBottomWidth: 1, padding: 2,
                                borderBottomColor: '#FFF', borderRadius: 0, paddingHorizontal: 10,
                            }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Correo electrónico:</Text>
                        <InputEmail
                            setValor={correo}
                            setTextChange={setCorreo}
                            setEditable={false}
                            inputStyle={{
                                backgroundColor: '#151515', borderBottomWidth: 1, padding: 2,
                                borderBottomColor: '#FFF', borderRadius: 0, paddingHorizontal: 10,
                            }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Teléfono:</Text>
                        <MaskedInputTelefono
                            telefono={telefono}
                            setTelefono={setTelefono}
                            setEditable={false}
                            inputStyle={{
                                backgroundColor: '#151515', borderBottomWidth: 1, padding: 2,
                                borderBottomColor: '#FFF', borderRadius: 0, paddingHorizontal: 10,
                            }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Dui:</Text>
                        <MaskedInputDui
                            dui={dui}
                            setDui={setDui}
                            setEditable={false}
                            inputStyle={{
                                backgroundColor: '#151515', borderBottomWidth: 1, padding: 2,
                                borderBottomColor: '#FFF', borderRadius: 0, paddingHorizontal: 10,
                            }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Cumpleaños:</Text>
                        <View style={styles.contenedorFecha}>
                            <TouchableOpacity onPress={showDatepicker}><Text style={styles.fechaSeleccionar}>{fechaNacimiento}</Text></TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    minimumDate={new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate())} // Fecha mínima permitida (100 años atrás desde la fecha actual)
                                    maximumDate={new Date()} // Fecha máxima permitida (fecha actual)
                                    onChange={onChange}
                                />
                            )}
                        </View>
                    </View>
                    <Boton5
                        textoBoton='Editar Usuario'
                        accionBoton={editProfile}
                    />
                    <Boton3
                        textoBoton='Cerrar Sesión'
                        accionBoton={handleLogout}
                    />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
    },
    borderedContainer: {
        flex: 1,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopColor: 'white',
        borderWidth: 1,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    scrollViewStyle: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        textAlign: 'center',
        fontFamily: 'monospace',
        marginTop: 70,
        marginBottom: 40,
        color: '#FFF',
        fontWeight: '900',
        fontSize: 18
    },
    title: {
        marginVertical: 2,
        fontFamily: 'monospace',
        color: 'white',
        fontWeight: '600',
        fontSize: 14
    },
    fechaSeleccionar: {
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
        fontSize: 15,
        fontWeight: '800',
        color: 'white',
        width: 275,
        padding: 2,
        paddingHorizontal: 10,
        marginVertical: 15
    },
    contenedorFecha: {
        backgroundColor: '#151515',
        color: "#fff",
        fontWeight: '600',
        borderRadius: 20,
    },
});