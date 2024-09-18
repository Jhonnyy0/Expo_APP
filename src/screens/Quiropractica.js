import { StyleSheet, Text, View, Alert, FlatList } from 'react-native';
import React, { useState } from 'react';
import * as Constantes from '../utils/constantes'
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ServicioCard from '../components/Cards/ServicioCard';

export default function Quiropractica({ navigation }) {
    // Estado para almacenar los detalles del historial
    const [dataDetalleServicios, setdataDetalleServicios] = useState([]);
    // Estado para el id del detalle seleccionado para modificar
    const [idServicio, setidServicio] = useState(null);
    // IP del servidor
    const ip = Constantes.IP;

    // Efecto para cargar los detalles del historial al cargar la pantalla o al enfocarse en ella
    useFocusEffect(
        // La función useFocusEffect ejecuta un efecto cada vez que la pantalla se enfoca.
        React.useCallback(() => {
            getDetalleServicio(); // Llama a la función getDetalleServicio.
        }, [])
    );

    // Función para obtener los detalles del historial desde el servidor
    const getDetalleServicio = async () => {
        try {
            const response = await fetch(`${ip}/expo_2024_v2/api/services/public/servicio.php?action=readAll8`, {
                method: 'GET',
            });
            const data = await response.json();
            console.log(data, "Data desde getServicio")
            if (data.status) {
                setdataDetalleServicios(data.dataset);
            } else {
                console.log("No hay detalles de Servicios disponibles")
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al listar la agenda');
        }
    };

    // Función para renderizar cada elemento de la agenda
    const renderItem = ({ item }) => (
        <ServicioCard
            item={item}
            idServicio={idServicio}
            setidServicio={setidServicio}
            getDetalleServicio={getDetalleServicio}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Servicios disponibles <FontAwesome name="user-md" size={24} color="#fff" style={styles.icon} /></Text>
            <Text style={styles.subtitulo}>Haz click en un servicio de preferencia para solicitar una cita.</Text>
            <View style={{ alignItems: 'center' }}>
                <FontAwesome name="caret-down" size={24} color="#fff" style={styles.icon} />
            </View>
            {dataDetalleServicios.length > 0 ? (
                <FlatList
                    data={dataDetalleServicios}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id_servicio.toString()}
                />
            ) : (
                <Text style={styles.subtitulo}>No hay servicios disponibles.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
    },
    title: {
        textAlign: 'center',
        fontFamily: 'monospace',
        marginTop: 30,
        marginBottom: 10,
        color: '#FFF',
        fontWeight: '900',
        fontSize: 22
    },
    subtitulo: {
        textAlign: 'center',
        fontFamily: 'monospace',
        marginBottom: 10,
        marginHorizontal: 15,
        color: '#757575',
        fontWeight: '500',
        fontSize: 16
    }
});