import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Alert, TouchableOpacity } from 'react-native';
import InputPass from '../components/Inputs/MaskedInputPassword'
import Boton2 from '../components/Buttons/Button2';
import { Ionicons } from '@expo/vector-icons';
import * as Constantes from '../utils/constantes'

export default function Contraseña({ navigation }) {

    const ip = Constantes.IP;

    const [clave, setClave] = useState('');
    const [confirmar, setConfirmar] = useState('');

    const changePassword = async () => {
        try {
            console.log("Datos a enviar", clave, confirmar)

            // Validar los campos
            if (!clave.trim() || !confirmar.trim()) {
                Alert.alert("Debes llenar todos los campos");
                return;
            }

            // Si todos los campos son válidos, proceder con la creación del usuario
            const formData = new FormData();
            formData.append('claveNueva', clave);
            formData.append('confirmarClave', confirmar);
            const response = await fetch(`${ip}/expo_2024_v2/api/services/public/cliente.php?action=changePasswordMobile`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log(data, "Data desde cambiar contraseña OK")
            if (data.status) {
                console.log(data, 'Valor de cambiar contraseña OK')
                
                Alert.alert('Contraseña reestablecida', '', [
                    { text: 'OK', onPress: () => Sesion() },
                ], { icon: 'success' });
            }

            else {
                Alert.alert('Error', data.error);
            }
        }

        catch (error) {
            Alert.alert('Ocurrió un error al intentar cambiar la contraseña');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(`${ip}/expo_2024_v2/api/services/public/cliente.php?action=logOut`, {
                method: 'GET'
            });
            const data = await response.json();
            if (data.status) {
                navigation.navigate('Bienvenida');
                Alert.alert('Sesion cerrada');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
        }
    };

    const Sesion = () => {
        navigation.navigate('Sesion');
        handleLogout();
    };

    const volverInicio = () => {
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
            <Text style={styles.texto}>REESTABLECER CONTRASEÑA</Text>
            <Text style={styles.subtitulo}>Vuelve a crear una contraseña que recuerdes para tu cuenta.</Text>
            <InputPass
                placeHolder='Contraseña'
                setEditable={true}
                setValor={clave}
                setTextChange={setClave}
            />
            <InputPass
                placeHolder='Confirmar contraseña'
                setEditable={true}
                setValor={confirmar}
                setTextChange={setConfirmar}
            />
            <Boton2
                mode="contained"
                textoBoton='Aceptar'
                accionBoton={changePassword}
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