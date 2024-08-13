import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import InputPass from '../components/Inputs/MaskedInputPassword'
import Boton2 from '../components/Buttons/Button2';
import { Ionicons } from '@expo/vector-icons';

export default function Contraseña({ navigation }) {

    const volverInicio = () => {
        navigation.navigate('Recuperacion');
    };

    const handleNavigateToPass = () => {
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
            <Text style={styles.texto}>REESTABLECER CONTRASEÑA</Text>
            <Text style={styles.subtitulo}>Vuelve a crear una contraseña que recuerdes para tu cuenta.</Text>
            <InputPass
                placeHolder='Contraseña'
                setEditable={true}
            />
            <InputPass
                placeHolder='Confirmar contraseña'
                setEditable={true}
            />
            <Boton2
                mode="contained"
                textoBoton='Aceptar'
                accionBoton={handleNavigateToPass}
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
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    space: {
        width: 10,
    },
});