import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const HistorialCard = ({ item }) => {

    return (
        <View style={styles.itemContainer}>
            <View style={styles.row}>
                <Text style={styles.itemTitle}>▸  Id de registro: </Text>
                <Text style={styles.itemText}>{item.id_cita}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.itemTitle}>▸  Fecha de asignacion: </Text>
                <Text style={styles.itemText}>{item.fecha_asignacion_cita}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.itemTitle}>▸  Estado: </Text>
                <Text style={styles.itemText}>{item.estado_cita}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.itemTitle}>▸  Tipo servicio: </Text>
                <Text style={styles.itemText}>{item.tipo_servicio}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.itemTitle}>▸  Empleado a cargo: </Text>
                <Text style={styles.itemText}>{item.nombre_empleado}</Text>
            </View>
        </View>
    );
};

export default HistorialCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAD8C0',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: '#5C3D2E',
    },
    itemContainer: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#000',
        borderRadius: 8,
        shadowColor: '#0c84e4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    itemText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#fff',
    },
});