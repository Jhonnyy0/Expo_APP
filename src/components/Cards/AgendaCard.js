import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../../utils/constantes'

const AgendaCard = ({ item, updateDataDetalleCita }) => {

    const ip = Constantes.IP;

    const handleDeleteDetalleCita = async (id_cita) => {
        try {
            // Mostrar un mensaje de confirmación antes de eliminar
            Alert.alert(
                'Confirmación',
                '¿Estás seguro de que deseas eliminar esta cita de la agenda?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    },
                    {
                        text: 'Eliminar',
                        onPress: async () => {
                            const formData = new FormData();
                            formData.append('id_cita', id_cita);
                            const response = await fetch(`${ip}/expo_2024_v2/api/services/public/cita.php?action=deleteDetail`, {
                                method: 'POST',
                                body: formData
                            });
                            const data = await response.json();
                            if (data.status) {
                                Alert.alert('Datos eliminados correctamente de la agenda');
                                // Llamar a la función de actualización para actualizar la lista
                                updateDataDetalleCita(prevData => prevData.filter(item => item.id_cita !== id_cita));
                            } else {
                                Alert.alert('Error al eliminar del carrito', data.error);
                            }
                        }
                    }
                ]
            );
        } catch (error) {
            Alert.alert("Error al eliminar la cita")
        }
    };

    return (
        <View style={styles.itemContainer}>
            <View style={styles.row}>
                <Text style={styles.itemTitle}>▸  Id de registro: </Text>
                <Text style={styles.itemText}>{item.id_cita}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.itemTitle}>▸  Fecha de la solicitud: </Text>
                <Text style={styles.itemText}>{item.fecha_creacion_cita}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.itemTitle}>▸  Estado: </Text>
                <Text style={styles.itemText}>En espera de validación</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.itemTitle}>▸  Tipo servicio: </Text>
                <Text style={styles.itemText}>{item.tipo_servicio}</Text>
            </View>

            <TouchableOpacity style={styles.deleteButton}
                onLongPress={() => handleDeleteDetalleCita(item.id_cita)}
            >
                <Text style={styles.buttonText}>Cancelar cita</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AgendaCard;

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
    deleteButton: {
        borderWidth: 1,
        borderColor: '#0c84e4',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#0c84e4', // Darker orange color for delete button
        marginVertical: 4,
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        fontSize: 17,
    },
    containerButtons: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});