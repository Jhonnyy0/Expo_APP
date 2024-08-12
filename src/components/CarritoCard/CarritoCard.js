import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../../utils/constantes'

const CarritoCard = ({ item,
    modalVisible,
    setModalVisible,
    cantidadProductoCarrito,
    setCantidadProductoCarrito,
    accionBotonDetalle,
    idCita,
    setIdCita, getDetalleCita, updateDataDetalleCita }) => {

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
            <Text style={styles.itemText}>Id de registro: {item.id_cita}</Text>
            <Text style={styles.itemText}>Fecha de la solicitud: {item.fecha_creacion_cita}</Text>
            <Text style={styles.itemText}>Estado: En espera de validación</Text>
            <Text style={styles.itemText}>tipo servicio: {item.tipo_servicio}</Text>

            <TouchableOpacity style={styles.deleteButton}
                onLongPress={() => handleDeleteDetalleCita(item.id_cita)}
            >
                <Text style={styles.buttonText}>Eliminar de la agenda</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CarritoCard;

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
        color: '#5C3D2E', // Brown color for the title
    },
    itemContainer: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemText: {
        fontSize: 16,
        marginBottom: 4,
        color: '#333',
    },
    modifyButton: {
        borderWidth: 1,
        borderColor: '#8F6B58',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#8F6B58', // Light brown color for modify button
        marginVertical: 4,
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: '#D2691E',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#D2691E', // Darker orange color for delete button
        marginVertical: 4,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
    },
    finalButton: {
        backgroundColor: '#A0522D', // Sienna color for final action buttons
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
    },
    finalButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    containerButtons: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
