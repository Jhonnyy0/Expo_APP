import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const Boton = ({ textoBoton, accionBoton, buttonStyle }) => {
    return (
        <TouchableOpacity onPress={accionBoton} style={styles.button}>
            <Text style={{...styles.buttonText, ...buttonStyle}}>{textoBoton}</Text>
        </TouchableOpacity>
    );
}

export default Boton;

const styles = StyleSheet.create({
    button: {
        textAlign: 'end',
        color: 'white',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
    },
});