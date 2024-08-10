import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const Boton2 = ({ textoBoton, accionBoton }) => {
    return (
        <TouchableOpacity onPress={accionBoton} style={styles.button}>
            <Text style={styles.buttonText}>{textoBoton}</Text>
        </TouchableOpacity>
    );
}

export default Boton2;

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        width: 170,
        height: 40,
        backgroundColor: '#C2B500',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});