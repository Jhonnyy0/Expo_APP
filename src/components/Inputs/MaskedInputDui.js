import React from 'react';
import { StyleSheet } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

export default function MaskedInputDui({ dui, setDui, setEditable, inputStyle, placeHolder }) {
    return (
        <MaskedTextInput
            mask="99999999-9"
            placeholder={placeHolder}
            placeholderTextColor="#fff"
            onChangeText={(text) => {
                setDui(text);
            }}
            style={{...styles.Input, ...inputStyle}}
            keyboardType="numeric"
            editable={setEditable}
            value={dui}
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