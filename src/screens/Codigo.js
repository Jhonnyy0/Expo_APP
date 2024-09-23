import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Alert, TouchableOpacity } from 'react-native';
import InputEmail from '../components/Inputs/InputEmail'
import Boton2 from '../components/Buttons/Button2';
import { Ionicons } from '@expo/vector-icons';
import * as Constantes from '../utils/constantes'

export default function Codigo({ navigation }) {

    const ip = Constantes.IP;

    const [correo, setCorreo] = useState('');

    const VerifyEmail = async () => {
        try {
            console.log("Datos a enviar", correo);

            // Validar que el campo de correo no esté vacío
            if (!correo.trim()) {
                Alert.alert("Debes ingresar un correo electrónico");
                return;
            }

            // Crear el FormData para enviar el correo
            const formData = new FormData();
            formData.append('correoUsuario', correo);

            // Realizar la petición para verificar el correo
            const response = await fetch(`${ip}/expo_2024_v2/api/services/public/cliente.php?action=readOneRecuperacion`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log(data, "Data desde enviar correo OK");

            if (data.status) {
                console.log(data, 'Valor de enviar correo OK');

                // Aquí puedes llamar a la función para enviar el correo
                enviarCorreo(formData);
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error('Error al intentar verificar el correo:', error);
            Alert.alert('Ocurrió un error al intentar leer el correo');
        }
    };

    const enviarCorreo = async (formData) => {
        try {
            const response = await fetch(`${ip}/expo_2024_v2/api/libraries/PHPMailer/enviar.php`, {
                method: 'POST',
                body: formData
            });

            const data = await response.text();
            console.log(data);  // Mostrar la respuesta del servidor

            Alert.alert('Correo enviado satisfactoriamente', '', [
                { text: 'OK', onPress: () => Recuperacion() },
            ], { icon: 'success' });
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            Alert.alert('Hubo un error al enviar el correo.');
        }
    };

    const Recuperacion = () => {
        navigation.navigate('Recuperacion');
    };

    const volverInicio = () => {
        navigation.navigate('Sesion');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={volverInicio} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Image
                source={require('../../assets/Logo.png')}
                style={styles.logo}
            />
            <Text style={styles.texto}>RECUPERACIÓN DE CONTRASEÑA</Text>
            <Text style={styles.subtitulo}>Enviaremos un codigo de recuperación al correo electronico de tu preferencia.</Text>
            <InputEmail
                placeHolder='Correo electronico'
                setEditable={true}
                setValor={correo}
                setTextChange={setCorreo}
            />
            <Boton2
                mode="contained"
                textoBoton='Enviar Código'
                accionBoton={VerifyEmail}
            />
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
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    logo: {
        width: 180,
        height: 140,
        alignSelf: 'center',
        marginTop: 120,
        marginBottom: 20,
    },
    texto: {
        fontFamily: 'monospace',
        fontSize: 22,
        fontWeight: '300',
        textAlign: 'center',
        marginVertical: 10,
        color: '#FFF',
    },
    subtitulo: {
        textAlign: 'center',
        fontFamily: 'monospace',
        marginBottom: 10,
        color: '#757575',
        fontWeight: '500',
        fontSize: 14
    },
});