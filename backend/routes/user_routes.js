const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/user_model');
const routerprod = express.Router();


//Ruta GET para ver todas las cuentas registradas
routerprod.get('/accounts', async (req, res) => {
    try {
        // Encuentra todos los usuarios en la base de datos
        const users = await User.find({}, '-password'); // Excluye el campo de contraseña en la respuesta

        // Verifica si hay usuarios
        if (users.length > 0) {
            res.json({ users });
        } else {
            res.json({ message: 'No hay cuentas registradas.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
    }
});

//Ruta POST para login
routerprod.post('/login',[
        body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
        body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    ], async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), error: true });
        }

        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username, password });

            if (user) {
                req.session = user;
                res.json({ message: `Inicio de sesión exitoso como: ${user.role}`});
            } else {
                res.json({ message: 'Nombre de usuario o contraseña incorrectos'});
            }
        } catch (error) {
            console.error(error);
            res.json({ message: 'Hubo un error al procesar la solicitud'});
        }
    }
);

//Ruta POST para registrar cuenta
routerprod.post('/register',[
        body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
        body('name').notEmpty().withMessage('El nombre es obligatorio'),
        body('role').notEmpty().withMessage('El rol es obligatorio'),
        body('password').notEmpty().withMessage('La contraseña es obligatoria'),
        body('reservedword').notEmpty().withMessage('La palabra reservada es obligatoria'),
    ], async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), error: true });
        }

        const { username, name, role, password, reservedword } = req.body;

        try {
            const existingUser = await User.findOne({ username });

            if (existingUser) {
                return res.json({ message: 'El usuario ya existe, ingresa otro...'});
            }
            const newUser = new User({ username, name, role, password, reservedword });
            await newUser.save();
            res.json({ message: 'Usuario agregado correctamente'});
        } catch (error) {
            res.status(400).json({ message: 'Hubo un error al procesar la solicitud'});
        }
    }
);

//Ruta POST para cambio de contrasena
routerprod.post('/forgotpassword',[
        body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
        body('reservedword').notEmpty().withMessage('La palabra reservada es obligatoria'),
        body('newPassword').notEmpty().withMessage('La nueva contraseña es obligatoria'),
    ], async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), error: true });
        }

        const { username, reservedword, newPassword } = req.body;

        try {
            const user = await User.findOne({ username, reservedword });

            if (user) {
                user.password = newPassword;
                await user.save();
                res.json({ message: 'Contraseña actualizada correctamente'});
            } else {
                res.json({ message: 'Nombre de usuario o palabra reservada incorrectos'});
            }
        } catch (error) {
            console.error(error);
            res.json({ message: 'Hubo un error al procesar la solicitud'});
        }
    }
);

module.exports = routerprod;