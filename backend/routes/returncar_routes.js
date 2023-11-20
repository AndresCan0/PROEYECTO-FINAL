const express = require('express');
const { body, validationResult } = require('express-validator');
const Returncar = require('../models/returncar_model');
const Rent = require('../models/rent_model');
const Car = require('../models/car_model');
const routerprod = express.Router();


// Ruta para crear una devolución
routerprod.post('/returncar',[
        body('rentnumber').notEmpty().withMessage('El número de renta es obligatorio'),
        body('platenumber').notEmpty().withMessage('La placa del automóvil es obligatoria'),
        body('returndate').notEmpty().withMessage('La fecha de devolución es obligatoria'),
    ], async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), error: true });
        }

    try {
        // Asegúrate de que todos los campos requeridos estén presentes en la solicitud
        const { rentnumber, platenumber, returndate } = req.body;
        if (!rentnumber || !platenumber || !returndate) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Verifica que la fecha de devolución no sea menor a la fecha inicial de la renta
        const rent = await Rent.findOne({ rentnumber });

        if (!rent) {
            return res.status(400).json({ error: 'La renta no existe' });
        }

        if (new Date(returndate) < rent.initialdate) {
            return res.status(400).json({ error: 'La fecha de devolución no puede ser menor a la fecha inicial de la renta' });
        }

        // Verifica que el automóvil exista y esté asociado a la renta
        const car = await Car.findOne({ platenumber });

        if (!car) {
            return res.status(400).json({ error: 'El automóvil no existe' });
        }

        if (car.status !== 'no disponible') {
            return res.status(400).json({ error: 'El automóvil no está registrado como rentado' });
        }

        // Actualiza el estado del automóvil a 'disponible'
        await Car.findOneAndUpdate({ platenumber }, { status: 'disponible' });

        // Crea la nueva devolución
        const returncar = new Returncar(req.body);
        await returncar.save();

        res.status(201).json({ mensaje: 'Devolución creada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = routerprod;