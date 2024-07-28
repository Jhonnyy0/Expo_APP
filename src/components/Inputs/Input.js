import { StyleSheet, TextInput } from 'react-native';

export default function Input({ placeHolder, setValor, setTextChange, inputStyle }) {
    return (
        <TextInput
        style={{...styles.Input, ...inputStyle}}
            placeholder={placeHolder}
            value={setValor}
            placeholderTextColor={'#FFF'}
            onChangeText={setTextChange}
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