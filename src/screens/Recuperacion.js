import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import Input from '../components/Inputs/Input'
import Boton2 from '../components/Buttons/Button2';
import { Ionicons } from '@expo/vector-icons';

export default function Recuperacion({ navigation }) {

    const volverInicio = () => {
        navigation.navigate('Codigo');
    };

    const handleNavigateToPass = () => {
        navigation.navigate('Contraseña');
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
            <Text style={styles.texto}>CODIGO DE RECUPERACIÓN</Text>
            <Text style={styles.subtitulo}>Ingresa el codigo que hemos enviado a tu correo electronico, no lo compartas con nadie.</Text>
            <View style={styles.containerInput}>
                <Input setEditable={true} inputStyle={{ width: 60 }} />
                <View style={styles.space} />
                <Input setEditable={true} inputStyle={{ width: 60 }} />
                <View style={styles.space} />
                <Input setEditable={true} inputStyle={{ width: 60 }} />
                <View style={styles.space} />
                <Input setEditable={true} inputStyle={{ width: 60 }} />
            </View>
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