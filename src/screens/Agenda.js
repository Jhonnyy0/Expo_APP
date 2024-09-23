// Importaciones necesarias
import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Constantes from '../utils/constantes';
import AgendaCard from '../components/Cards/AgendaCard';

const Agenda = ({ navigation }) => {
    // Estado para almacenar los detalles de la agenda
    const [dataDetalleAgenda, setDataDetalleAgenda] = useState([]);
    // Estado para el id del detalle seleccionado para modificar
    const [idCita, setIdCita] = useState(null);
    // IP del servidor
    const ip = Constantes.IP;

    // Función para navegar hacia atrás a la pantalla de la agenda
    const backCitas = () => {
        navigation.navigate('Citas');
    };

    // Efecto para cargar los detalles del carrito al cargar la pantalla o al enfocarse en ella
    useFocusEffect(
        // La función useFocusEffect ejecuta un efecto cada vez que la pantalla se enfoca.
        React.useCallback(() => {
            getDetalleCita(); // Llama a la función getDetalleCita.
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
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al listar la agenda');
        }
    };

    // Función para renderizar cada elemento de la agenda
    const renderItem = ({ item }) => (
        <AgendaCard
            item={item}
            idCita={idCita}
            setIdCita={setIdCita}
            getDetalleCita={setDataDetalleAgenda}
        />
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={backCitas} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            {/* Título de la pantalla */}
            <Text style={styles.texto}>Agenda de citas <FontAwesome name="sticky-note" size={24} color="#fff" style={styles.icon} /></Text>
            <Text style={styles.subtitulo}>Información sobre todos los registros de citas en espera de ser aceptadas por un empleado. </Text>
            <View style={{ alignItems: 'center' }}>
                <FontAwesome name="caret-down" size={24} color="#fff" style={styles.icon} />
            </View>
            {/* Lista de detalles de la agenda */}
            {dataDetalleAgenda.length > 0 ? (
                <FlatList
                    data={dataDetalleAgenda}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id_cita.toString()}
                />
            ) : (
                <Text style={styles.titleDetalle}>No hay citas disponibles.</Text>
            )}
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
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    texto: {
        textAlign: 'center',
        fontFamily: 'monospace',
        marginTop: 50,
        marginBottom: 10,
        color: '#FFF',
        fontWeight: '900',
        fontSize: 18
    },
    subtitulo: {
        textAlign: 'center',
        fontFamily: 'monospace',
        marginBottom: 10,
        color: '#757575',
        fontWeight: '500',
        fontSize: 14
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
