import React, { useState } from 'react';
import { StyleSheet, View, Image, Alert, Text } from 'react-native';
import InputEmail from '../components/Inputs/InputEmail'
import InputPass from '../components/Inputs/MaskedInputPassword'
import Boton from '../components/Buttons/Button';
import Boton2 from '../components/Buttons/Button2';
import * as Constantes from '../utils/constantes'
import { useFocusEffect } from '@react-navigation/native';

export default function Sesion({ navigation }) {

    // Estado de la app
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');

    const ip = Constantes.IP;

    // Efecto para cargar los detalles del carrito al cargar la pantalla o al enfocarse en ella
    useFocusEffect(
        // La función useFocusEffect ejecuta un efecto cada vez que la pantalla se enfoca.
        React.useCallback(() => {
            validarSesion(); // Llama a la función getDetalleCarrito.
        }, [])
    );

    const validarSesion = async () => {
        try {
            const response = await fetch(`${ip}/expo_2024_v2/api/services/public/cliente.php?action=getUser`, {
                method: 'GET'
            });

            const data = await response.json();

            if (data.status === 1) {
                navigation.navigate('TabNavigator');
                console.log("Se ingresa con la sesión activa")
            }

            else {
                console.log("No hay sesión activa")
                return
            }
        }

        catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al validar la sesión');
        }
    };

    const handlerLogin = async () => {
        if (!correo || !clave) {
            Alert.alert('Error', 'Por favor ingrese su correo y contraseña');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('correo_cliente', correo);
            formData.append('contra_cliente', clave);

            const response = await fetch(`${ip}/expo_2024_v2/api/services/public/cliente.php?action=logIn`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.status) {
                setClave('')
                setCorreo('')
                navigation.navigate('TabNavigator');
            }

            else {
                console.log(data);
                Alert.alert('Error sesión', data.error);
            }
        }

        catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
        }
    };

    const handleNavigateToRegister = async () => {
        // Función para navegar a la pantalla de registro
        navigation.navigate('SignUp');
    };

    const handleNavigateToCode= async () => {
        // Función para navegar a la pantalla de registro
        navigation.navigate('Codigo');
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/Logo.png')}
                style={styles.logo}
            />
            <Text style={styles.texto}>QUIROPRACTICA ESPECÍFICA</Text>
            <InputEmail
                placeHolder='Correo electronico'
                setValor={correo}
                setTextChange={setCorreo}
                setEditable={true}
            />
            <InputPass
                placeHolder='Contraseña'
                setValor={clave}
                setTextChange={setClave}
            />
            <Boton2
                mode="contained"
                textoBoton='Aceptar'
                accionBoton={handlerLogin}
            />
            <View style={styles.containerTitle}>
                <Text style={styles.subtitle}>No tengo una cuenta</Text>
                <Boton
                    textoBoton="Registrate."
                    accionBoton={handleNavigateToRegister}
                    buttonStyle={{ color: '#3d6817', marginTop: 0 }}
                />
            </View>
            <View style={styles.containerTitle}>
                <Text style={{...styles.subtitle, marginTop: -15}}>Olvide mi contraseña</Text>
                <Boton
                    textoBoton="Envia un codigo."
                    accionBoton={handleNavigateToCode}
                    buttonStyle={{ color: '#3d6817', marginTop: -15 }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#151515',
    },
    logo: {
        width: 180,
        height: 140,
        alignSelf: 'center',
        marginTop: 120,
        marginBottom: 20,
    },
    texto: {
        fontSize: 22,
        fontWeight: '300',
        textAlign: 'center',
        marginVertical: 20,
        color: '#FFF',
    },
    containerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '400',
        color: '#FFF',
    },
});