import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import InputEmail from '../components/Inputs/InputEmail'
import Boton2 from '../components/Buttons/Button2';
import { Ionicons } from '@expo/vector-icons';

export default function Codigo({ navigation }) {

    const volverInicio = () => {
        navigation.navigate('Sesion');
    };

    const handleNavigateToRecover = () => {
        navigation.navigate('Recuperacion');
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
            />
            <Boton2
                mode="contained"
                textoBoton='Enviar Código'
                accionBoton={handleNavigateToRecover}
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