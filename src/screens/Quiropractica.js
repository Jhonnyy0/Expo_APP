import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList, ScrollView, SafeAreaView, Image, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import * as Constantes from '../utils/constantes'
import Buttons from '../components/Buttons/Button';
import ProductoCard from '../components/Productos/ProductoCard';
import ModalCompra from '../components/Modales/ModalCompra';
import RNPickerSelect from 'react-native-picker-select';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons'; // Importamos el ícono

export default function Quiropractica({ navigation }) {

    const volverInicio = async () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quiropractica Especifica</Text>
            <Buttons
                textoBoton='Volver a Home'
                accionBoton={volverInicio}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    containerFlat: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    container: {
        flex: 1,
        backgroundColor: '#151515',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 1,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    textTitle: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '700'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        marginLeft: 8,
    },
    button: {
        backgroundColor: '#AF8260',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600'
    },
    image: {
        width: '65%',
        height: 150,
        borderRadius: 8,
        marginBottom: 12,
    },
    imageContainer: {
        alignItems: 'center',
    },
    textDentro: {
        fontWeight: '400'
    },
    title: {
        textAlign: 'center',
        fontFamily: 'monospace',
        marginTop: 70,
        marginBottom: 10,
        color: '#FFF',
        fontWeight: '900',
        fontSize: 24
    },
    cartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#AF8260',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    cartButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 5,
        marginHorizontal: 5,
        color: '#5C3D2E', // Brown color for the title
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#AF8260', // Color del borde
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
        backgroundColor: '#AF8260', // Color de fondo
    },
    picker: {
        color: '#ffffff'
    },
});