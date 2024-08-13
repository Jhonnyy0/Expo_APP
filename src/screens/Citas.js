// Importaciones necesarias
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Constants from 'expo-constants';

const Agenda = ({ navigation }) => {

    const handleNavigateToAgenda = async () => {
        // Función para navegar a la pantalla de registro
        navigation.navigate('Agenda');
    };

    const handleNavigateToHistorial = async () => {
        // Función para navegar a la pantalla de registro
        navigation.navigate('Historial');
    };


    return (
        <View style={styles.container}>

            {/* Título de la pantalla */}
            <Text style={styles.texto}>Registro de citas <FontAwesome name="book" size={24} color="#fff" style={styles.icon} /></Text>
            <Text style={styles.subtitulo}>Información sobre las citas pendientes, en proceso o terminadas por el usuario.</Text>

            <TouchableOpacity onPress={handleNavigateToAgenda}
                activeOpacity={0.6}>
                <ImageBackground
                    source={require('./../img/Fondo1.png')}
                    style={styles.boton}>
                    <Text style={styles.botonTexto}>Agenda de citas</Text>
                </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNavigateToHistorial}
                activeOpacity={0.6}>
                <ImageBackground
                    source={require('./../img/Fondo2.png')}
                    style={styles.boton}>
                    <Text style={styles.botonTexto}>Historial de citas</Text>
                </ImageBackground>
            </TouchableOpacity>

        </View>
    );
};

export default Agenda;

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#151515',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 16,
    },
    texto: {
        textAlign: 'center',
        fontFamily: 'monospace',
        marginTop: 100,
        marginBottom: 10,
        color: '#FFF',
        fontWeight: '900',
        fontSize: 22
    },
    boton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        height: 200,
        marginBottom: 20,
        opacity: 0.7,
    },
    botonTexto: {
        fontFamily: 'monospace',
        fontSize: 21,
        color: 'white',
        fontWeight: 'bold',
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
