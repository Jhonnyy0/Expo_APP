﻿# Repositorio para aplicación movil Quiropractica Especifica
INTEGRANTES: 
Juan Pablo Montes Espinoza 
Ricardo Nicolas Melara Rauda
Jhonny Alejandro Amaya Pérez
Manuel Enrique Contreras Rivera
Alisson Ivania Zepeda Caceres

## Dependencias del proyecto:
### Dependencias para el funcionamiento de la app, si creas un proyecto nuevo, deberas de instalar las siguientes dependencias en el proyecto.

    "@expo/vector-icons": "^14.0.2",
    "@react-native-community/datetimepicker": "^8.0.1",
    "@react-navigation/bottom-tabs": "^6.5.20",
    "@react-navigation/native": "^6.1.17",
    "@react-navigation/native-stack": "^6.9.26",
    "expo": "~51.0.20",
    "expo-status-bar": "~1.12.1",
    "react": "18.2.0",
    "react-native": "0.74.3",
    "react-native-datepicker": "^1.7.2",
    "react-native-mask-text": "^0.14.2",
    "react-native-picker-select": "^9.1.3",
    "react-native-vector-icons": "^10.1.0"

## Si el proyecto no corre en los dispositivos ejecutar el siguiente comando:

* npx expo install expo@latest

Estandares de programacion de Java Script:

-Se utiliza snakecase, para la asignacion de variables y constantes como en el siguiente ejemplo:

if (DATA.status) {
    // Se inicializan los campos del formulario con los datos del usuario que ha iniciado sesión.
    const ROW = DATA.dataset;
    NOMBRE_ADMINISTRADOR.textContent = ROW.nombre_admin;
    CORREO_ADMINISTRADOR.textContent = ROW.correo_admin;
} 
-Se utiliza camelcase, para la asignacion de ID en formularios y modals como en el siguiente ejemplo:

// Constante para establecer la modal de cambiar contraseña. const PASSWORD_MODAL = new bootstrap.Modal('#passwordModal'); // Constante para establecer el formulario de cambiar contraseña. const PASSWORD_FORM = document.getElementById('passwordForm'); // Constante para establecer la modal de cambiar contraseña. const PERFIL_MODAL = new bootstrap.Modal('#PerfilModal'); // Constante para establecer el formulario de cambiar contraseña. const PROFILE_FORM = document.getElementById('editForm');

Estandares de programacion en PHP:

-Se utiliza snakecase, para la asignacion de parametros como en el siguiente ejemplo:

            if (
                !$administrador->setCorreo($_POST['correo_admin']) or
                !$administrador->setContraseña($_POST['contra_admin']) or
                !$administrador->setNombre($_POST['nombre_admin'])
            )
-Se utiliza camelcase, para la asignacion de variables como en el ejemplo:

if (isset($_SESSION['idAdministrador'])) $result['session'] = 1;

estandares de programacion:

snake_case camelCase PascalCase UPPERCASE kebab-case

JAVASCRIPT:

Nombre de las funciones: camelCase
Constantes: Mayúsculas
Al terminar cada sentencia de código se termina con punto y coma ;
Variables let: minúsculas.
Identación de sangría en el código (es de 4).
Código comentado
PHP:

Nombre de clases: StudlyCaps o PascalCase (Es el mismo) (No lleva espacios y cada palabra comienza en mayúscula)
Nombre de metódos para solicitudes a la base: camelCase (No lleva espacios y solo la primera letra de la palabra es minúscula.)
Identación de sangría en el código (Es de 4)
Código comentado
