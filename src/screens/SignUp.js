import { StyleSheet, View, Alert, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import * as Constantes from '../utils/constantes'
import DateTimePicker from '@react-native-community/datetimepicker';
//Import de componentes
import Input from '../components/Inputs/Input'
import InputPass from '../components/Inputs/MaskedInputPassword'
import Boton from '../components/Buttons/Button';
import Boton2 from '../components/Buttons/Button2';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';

export default function SignUp({ navigation }) {

    const ip = Constantes.IP;

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    // Estado de la app
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [dui, setDui] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmar, setConfirmar] = useState('');

    // Expresiones regulares para validar DUI y teléfono
    const duiRegex = /^\d{8}-\d$/;
    const telefonoRegex = /^\d{4}-\d{4}$/;

    /*
    Codigo para mostrar el datetimepicker
    */

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

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    /*
    Fin Codigo para mostrar el datetimepicker
    */

    // Props que recibe input
    // placeHolder, setValor, contra, setTextChange

    const handleCreate = async () => {
        try {

            // Calcular la fecha mínima permitida (18 años atrás desde la fecha actual)
            const fechaMinima = new Date();

            fechaMinima.setFullYear(fechaMinima.getFullYear() - 18);
            if (!nombre.trim() || !apellido.trim() || !correo.trim() || !dui.trim() ||
                !fechaNacimiento.trim() || !telefono.trim() || !contraseña.trim() || !confirmar.trim()) {
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

            else if (date > fechaMinima) {
                Alert.alert('Error', 'Debes tener al menos 18 años para registrarte.');
                return;
            }

            // Si todos los campos son válidos, proceder con la creación del usuario
            const formData = new FormData();
            formData.append('nombreCliente', nombre);
            formData.append('apellidoCliente', apellido);
            formData.append('nacimientoCliente', fechaNacimiento)
            formData.append('correoCliente', correo);
            formData.append('duiCliente', dui);
            formData.append('telefonoCliente', telefono);
            formData.append('contraseñaCliente', contraseña);
            formData.append('confirmarcontraseñaCliente', confirmar);

            const response = await fetch(`${ip}/expo_2024_v2/api/services/public/clientes.php?action=signUp`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                console.log("Entro al status")
                Alert.alert('Datos Guardados correctamente');
                navigation.navigate('Sesion');
            }

            else {
                console.log("Error status")
                Alert.alert('Error', data.error);
            }
        }

        catch (error) {
            Alert.alert('Ocurrió un error al intentar crear el usuario');
        }
    };

    const handleNavigateToLogin = async () => {
        // Función para navegar a la pantalla de login
        navigation.navigate('Sesion');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Image
                    source={require('../../assets/Logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.inputTitle}>Nombre:</Text>
                <Input
                    setValor={nombre}
                    setTextChange={setNombre}
                    inputStyle={{ backgroundColor: '#8a8a8a' }}
                />
                <Text style={styles.inputTitle}>Apellido:</Text>
                <Input
                    setValor={apellido}
                    setTextChange={setApellido}
                    inputStyle={{ backgroundColor: '#8a8a8a' }}
                />
                <Text style={styles.inputTitle}>DUI:</Text>
                <MaskedInputDui
                    setValor={dui}
                    setDui={setDui}
                    setEditable={true}
                    inputStyle={{ backgroundColor: '#8a8a8a' }}
                />
                <Text style={styles.inputTitle}>Fecha de Nacimiento:</Text>
                <View style={styles.contenedorFecha}>
                    <TouchableOpacity onPress={showDatepicker}><Text style={styles.fechaSeleccionar}>Seleccionar Fecha</Text></TouchableOpacity>
                    <Text style={styles.fecha}>Seleccion: {fechaNacimiento}</Text>
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
                <Text style={styles.inputTitle}>Teléfono:</Text>
                <MaskedInputTelefono
                    setValor={telefono}
                    setTelefono={setTelefono}
                    inputStyle={{ backgroundColor: '#8a8a8a' }}
                />
                <Text style={styles.inputTitle}>Correo Electrónico:</Text>
                <InputEmail
                    setValor={correo}
                    setTextChange={setCorreo}
                    setEditable={true}
                    inputStyle={{ backgroundColor: '#8a8a8a' }}
                />
                <Text style={styles.inputTitle}>Contraseña:</Text>
                <InputPass
                    setValor={contraseña}
                    setTextChange={setContraseña}
                    secureTextEntry
                    inputStyle={{ backgroundColor: '#8a8a8a' }}
                />
                <Text style={styles.inputTitle}>Confirmar Contraseña:</Text>
                <InputPass
                    setValor={confirmar}
                    setTextChange={setConfirmar}
                    secureTextEntry
                    inputStyle={{ backgroundColor: '#8a8a8a' }}
                />
                <Boton2
                    mode="contained"
                    textoBoton='Aceptar'
                    accionBoton={handleCreate}
                >
                </Boton2>
                <Boton
                    textoBoton="Regresar al inicio."
                    accionBoton={handleNavigateToLogin}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#000000',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    logo: {
        width: 150,
        height: 120,
        alignSelf: 'center',
        marginVertical: 30,
    },
    inputTitle: {
        fontSize: 15,
        color: 'white',
        alignSelf: 'flex-start',
        marginTop: 7,
        marginLeft: 60
    },
    fecha: {
        fontWeight: '600',
        color: '#FFF'
    },
    fechaSeleccionar: {
        fontSize: 15,
        fontWeight: '800',
        color: 'white',
    },
    contenedorFecha: {
        backgroundColor: '#8a8a8a',
        color: "#fff",
        fontWeight: '600',
        width: 275,
        paddingHorizontal: 25,
        padding: 10,
        borderRadius: 20,
        marginVertical: 10
    }
});