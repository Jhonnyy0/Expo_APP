import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform } from 'react-native';

// Importa tus componentes de pantalla aquí
import Quiropractica from '../screens/Quiropractica';
import Home from '../screens/Home';
import Agenda from '../screens/Agenda';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, // Oculta el header
                tabBarActiveTintColor: '#026AA7', // Color de los íconos activos
                tabBarInactiveTintColor: '#014770', // Color de los íconos inactivos
                tabBarStyle: {
                    backgroundColor: '#FFF',
                    height: Platform.OS === 'ios' ? 80 : 60, // Estilo de la barra de pestañas, altura diferente para iOS y Android
                    borderTopWidth: 0
                }, // Estilo de la barra de pestañas
                tabBarIcon: ({ focused, color, size }) => { // Función que define el ícono de la pestaña
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Quiropractica') {
                        iconName = focused ? 'medical' : 'medical-outline';
                    } else if (route.name === 'Agenda') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    }
                    return <Ionicons name={iconName} color={color} size={size} />;
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ title: 'Principal' }}
            />
            <Tab.Screen
                name="Quiropractica"
                component={Quiropractica}
                options={{ title: 'Quiropractica' }}
            />
            <Tab.Screen
                name="Agenda"
                component={Agenda}
                options={{ title: 'Agenda' }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;