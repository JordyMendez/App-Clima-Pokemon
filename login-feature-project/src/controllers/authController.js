const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario sin cifrar la contraseña
        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Inicio de sesión
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Buscar al usuario por nombre de usuario
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Credenciales Incorrectas  usuario' });
        }

        // Comparar la contraseña ingresada con la almacenada (sin encriptación)
        if (password !== user.password) {
            return res.status(400).json({ message: 'Credenciales Incorrectas contrasenia' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token);
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};
