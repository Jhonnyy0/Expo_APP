import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList, ScrollView, SafeAreaView, Image, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import * as Constantes from '../utils/constantes'
import Buttons from '../components/Buttons/Button';
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
    container: {
        flex: 1,
        backgroundColor: '#151515',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
    },
    title: {
        textAlign: 'center',
        fontFamily: 'monospace',
        marginTop: 30,
        marginBottom: 10,
        color: '#FFF',
        fontWeight: '900',
        fontSize: 24
    },
});