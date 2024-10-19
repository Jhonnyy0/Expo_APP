import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ImageBackground, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../../utils/constantes'

const ServicioCard = ({ item, getDetalleServicio, navigation }) => {

    const ip = Constantes.IP;

    const handleCreateCita = async (id_servicio) => {
        try {
            // Mostrar un mensaje de confirmación antes de eliminar
            Alert.alert(
                'Confirmación',
                '¿Deseas agendar una cita?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    },
                    {
                        text: 'Agregar',
                        onPress: async () => {
                            const formData = new FormData();
                            formData.append('idServicio', id_servicio);
                            const response = await fetch(`${ip}/expo_2024_v2/api/services/public/cita.php?action=createRowCliente`, {
                                method: 'POST',
                                body: formData
                            });
                            const data = await response.json();
                            if (data.status) {
                                Alert.alert('Cita agendada correctamente');
                                // Llamar a la función de actualización para actualizar la lista
                                getDetalleServicio(prevData => prevData.filter(item => item.id_servicio !== id_servicio));
                            } else {
                                Alert.alert('Error al momento de agendar cita', data.error);
                            }
                        }
                    }
                ]
            );
        } catch (error) {
            Alert.alert("Error al agendar cita")
        }
    };

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => handleCreateCita(item.id_servicio)}
                activeOpacity={0.5}>
                <Text style={styles.botonTexto}>{item.tipo_servicio}</Text>
                <Text style={styles.BotonDesc}>{item.descripcion_servicio}</Text>
                <ImageBackground
                    source={{ uri: `${ip}/expo_2024_v2/api/images/imagenes/${item.imagen_1}` }}
                    style={styles.boton}>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
};

export default ServicioCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAD8C0',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 16,
    },
    itemContainer: {
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 6,
        backgroundColor: '#000',
        borderRadius: 8,
        shadowColor: '#0c84e4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    boton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        height: 300,
        marginBottom: 20,
        opacity: 0.7,
    },
    botonTexto: {
        fontFamily: 'monospace',
        fontSize: 21,
        color: '#026AA7',
        fontWeight: 'bold',
    },
    BotonDesc: {
        alignContent: 'center',
        fontFamily: 'monospace',
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 10,
    },
});