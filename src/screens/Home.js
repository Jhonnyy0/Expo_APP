import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import Boton4 from '../components/Buttons/Button4';
import * as Constantes from '../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';

export default function Home({ navigation }) {
    const [nombre, setNombre] = useState(null);
    const [apellido, setApellido] = useState(null);
    const ip = Constantes.IP;

    const EditUser = () => {
        navigation.navigate('UpdateUser');
    };

    const getUser = async () => {
        try {
            const response = await fetch(`${ip}/expo_2024_v2/api/services/public/cliente.php?action=getUserMobile`, {
                method: 'GET'
            });
            const data = await response.json();
            if (data.status) {
                setNombre(data.name.nombre_cliente);
                setApellido(data.name.apellido_cliente);
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
        }
    };

    // logica para cargar los datos del usuario al cargar la pantalla
    useFocusEffect(
        React.useCallback(() => {
            getUser();
        }, [])
    );
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/Titulo.png')}
                style={styles.image}
            />
            <Text style={styles.title}>Bienvenid@</Text>
            <Text style={styles.subtitle}>
                {nombre ? '"' + nombre + ' ' : 'No hay Nombre para mostrar'}
                {apellido ? apellido + '"' : 'No hay Apellido para mostrar'}
            </Text>
            <Boton4
                textoBoton='Perfil de usuario'
                accionBoton={EditUser}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 250,
        height: 60,
        marginBottom: 15
    },
    button: {
        borderWidth: 2,
        borderColor: "black",
        width: 100,
        borderRadius: 10,
        backgroundColor: "darkblue"
    },
    buttonText: {
        textAlign: 'center',
        color: "white"
    },
    title: {
        fontFamily: 'monospace',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 5,
        color: '#fff',
    },
    subtitle: {
        fontFamily: 'monospace',
        fontSize: 18,
        fontWeight: '800',
        textAlign: 'center',
        marginVertical: 5,
        color: '#fff',
    },
});