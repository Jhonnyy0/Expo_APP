import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Alert, TouchableOpacity } from 'react-native';
import Input from '../components/Inputs/Input'
import Boton2 from '../components/Buttons/Button2';
import { Ionicons } from '@expo/vector-icons';
import * as Constantes from '../utils/constantes'
import Codigo from './Codigo';

export default function Recuperacion({ navigation }) {

    const ip = Constantes.IP;

    const [codigo, setCodigo] = useState('');

    const VerifyCodigo = async () => {
        try {
            console.log("Datos a enviar", codigo);

            // Validar que el campo de codigo no esté vacío
            if (!codigo.trim()) {
                Alert.alert("Debes ingresar un codigo electrónico");
                return;
            }

            // Crear el FormData para enviar el codigo
            const formData = new FormData();
            formData.append('codigoUsuario', codigo);

            // Realizar la petición para verificar el codigo
            const response = await fetch(`${ip}/expo_2024_v2/api/services/public/cliente.php?action=checkUserCodigo`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log(data, "Data desde enviar codigo OK");

            if (data.status) {
                console.log(data, 'Valor de enviar codigo OK');
                navigation.navigate('Contraseña');

                // Aquí puedes llamar a la función para enviar el codigo
                enviarcodigo(formData);
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error('Error al intentar verificar el codigo:', error);
            Alert.alert('Ocurrió un error al intentar leer el codigo');
        }
    };

    const volverInicio = () => {
        navigation.navigate('Codigo');
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
                <Input
                    setEditable={true}
                    setValor={codigo}
                    setTextChange={setCodigo}
                    inputStyle={{ width: 250 }}
                />
            </View>
            <Boton2
                mode="contained"
                textoBoton='Aceptar'
                accionBoton={VerifyCodigo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
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