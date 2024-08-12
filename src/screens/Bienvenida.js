import React, { useState } from 'react';
import { StyleSheet, View, Image, Alert, Text } from 'react-native';
import Boton4 from '../components/Buttons/Button4';

export default function Bienvenida({ navigation }) {

    const handleNavigateToLogin = async () => {
        // Función para navegar a la pantalla de registro
        navigation.navigate('Sesion');
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/Logo.png')}
                style={styles.logo}
            />
            <Text style={styles.texto}>QUIROPRACTICA ESPECÍFICA</Text>
            <Boton4
                mode="contained"
                textoBoton='Iniciar'
                accionBoton={handleNavigateToLogin}
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
    logo: {
        width: 180,
        height: 140,
        alignSelf: 'center',
        marginTop: 250,
        marginBottom: 10,
    },
    texto: {
        fontSize: 22,
        fontWeight: '300',
        textAlign: 'center',
        marginVertical: 10,
        color: '#FFF',
    }
});