const axios = require('axios');

// Datos del usuario que se quiere crear
const user = {
  username: 'nuevoUsuario', // Cambia el nombre de usuario
  password: '123456' // Cambia la contraseña
};

// URL de tu API de backend
const API_URL = 'http://localhost:4000/api/auth/register';

// Función para registrar el usuario
const registerUser = async () => {
  try {
    const response = await axios.post(API_URL, user);
    console.log('Usuario creado:', response.data);
  } catch (error) {
    console.error('Error al crear el usuario:');
    console.error(error.response?.data || error.message || error);
  }
};

// Llamar a la función para crear el usuario
registerUser();
