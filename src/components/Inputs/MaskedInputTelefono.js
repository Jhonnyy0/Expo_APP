import React from 'react';
import { StyleSheet } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

export default function MaskedInputTelefono({ telefono, setTelefono, inputStyle, placeHolder }) {
    return (
        <MaskedTextInput
            mask="9999-9999"
            placeholder={placeHolder}
            placeholderTextColor="#fff"
            onChangeText={(text) => {
                setTelefono(text);
            }}
            style={{...styles.Input, ...inputStyle}}
            keyboardType="numeric"
            value={telefono}
        />
    );
}

const styles = StyleSheet.create({
    Input: {
        backgroundColor: '#3d6817',
        color: "#fff",
        fontWeight: '600',
        width: 275,
        paddingHorizontal: 25,
        padding: 10,
        borderRadius: 20,
        marginVertical: 10
    },
});