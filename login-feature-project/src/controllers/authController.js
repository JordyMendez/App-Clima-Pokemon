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

        // Crear un nuevo usuario (sin encriptar la contraseña)
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
            return res.status(404).json({ message: 'Credenciales Incorrectas' });
        }

        // Comparar la contraseña ingresada con la almacenada (sin encriptar)
        if (password !== user.password) {
            return res.status(400).json({ message: 'Credenciales Incorrectas' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Cambio de contraseña
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Obtener el ID del usuario desde el token (requiere middleware de autenticación)
        const userId = req.user?.id; // Suponiendo que usas middleware que decodifica el token y lo guarda en req.user

        if (!userId) {
            return res.status(401).json({ message: "No autorizado" });
        }

        // Buscar al usuario en la base de datos
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar contraseña actual (sin encriptar)
        if (currentPassword !== user.password) {
            return res.status(400).json({ message: "La contraseña actual es incorrecta" });
        }

        // Guardar nueva contraseña (sin encriptar)
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Contraseña actualizada" });
    } catch (error) {
        res.status(500).json({ message: "Error", error });
    }
};