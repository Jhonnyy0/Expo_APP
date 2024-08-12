// Importaciones necesarias
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
// Importa la función useFocusEffect de @react-navigation/native, 
// que permite ejecutar un efecto cada vez que la pantalla se enfoca.

import Constants from 'expo-constants';
import * as Constantes from '../utils/constantes';
import Buttons from '../components/Buttons/Button';
import CarritoCard from '../components/CarritoCard/CarritoCard';

const Agenda = ({ navigation }) => {
    // Estado para almacenar los detalles del carrito
    const [dataDetalleAgenda, setDataDetalleAgenda] = useState([]);
    // Estado para el id del detalle seleccionado para modificar
    const [idCita, setIdCita] = useState(null);
    // Estado para controlar la visibilidad del modal de edición de cantidad
    const [modalVisible, setModalVisible] = useState(false);
    // IP del servidor
    const ip = Constantes.IP;

    // Función para navegar hacia atrás a la pantalla de productos
    const backQuiropractica = () => {
        navigation.navigate('Quiropractica');
    };

    // Efecto para cargar los detalles del carrito al cargar la pantalla o al enfocarse en ella
    useFocusEffect(
        // La función useFocusEffect ejecuta un efecto cada vez que la pantalla se enfoca.
        React.useCallback(() => {
            getDetalleCita(); // Llama a la función getDetalleCarrito.
        }, [])
    );

    // Función para obtener los detalles de la cita desde el servidor
    const getDetalleCita = async () => {
        try {
            const response = await fetch(`${ip}/expo_2024_v2/api/services/public/cita.php?action=readAllCliente`, {
                method: 'GET',
            });
            const data = await response.json();
            console.log(data, "Data desde getCita")
            if (data.status) {
                setDataDetalleAgenda(data.dataset);
            } else {
                console.log("No hay detalles de citas disponibles")
                //Alert.alert('ADVERTENCIA', data.error);
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al listar la agenda');
        }
    };

    // Función para renderizar cada elemento de la agenda
    const renderItem = ({ item }) => (
        <CarritoCard
            item={item}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            idCita={idCita}
            setIdCita={setIdCita}

            getDetalleCita={getDetalleCita}
        />
    );

    return (
        <View style={styles.container}>

            {/* Título de la pantalla */}
            <Text style={styles.texto}>Agenda de citas</Text>

            {/* Lista de detalles del carrito */}
            {dataDetalleAgenda.length > 0 ? (
                <FlatList
                    data={dataDetalleAgenda}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id_cita.toString()}
                />
            ) : (
                <Text style={styles.titleDetalle}>No hay citas disponiblesa.</Text>
            )}

            {/* Botones de finalizar pedido y regresar a productos */}
            <View style={styles.containerButtons}>
                <Buttons
                    textoBoton='Regresar a Quiropractica'
                    accionBoton={backQuiropractica}
                />
            </View>
        </View>
    );
};

export default Agenda;

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 16,
    },
    texto: {
        textAlign: 'center',
        fontFamily: 'monospace',
        marginTop: 50,
        marginBottom: 20,
        color: '#FFF',
        fontWeight: '900',
        fontSize: 18
    },
    titleDetalle: {
        textAlign: 'center',
        fontFamily: 'monospace',
        marginBottom: 40,
        color: '#FFF',
        fontWeight: '900',
        fontSize: 16
    },
    containerButtons: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
