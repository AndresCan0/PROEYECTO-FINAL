const express = require('express');
const { body, validationResult } = require('express-validator');
const Car = require('../models/car_model');
const routerprod = express.Router();


//Ruta POST para crear un auto
routerprod.post('/cars', [
    body('platenumber').notEmpty().withMessage('La placa del automóvil es obligatoria'),
    body('brand').notEmpty().withMessage('La marca del automóvil es obligatoria'),
    body('status').notEmpty().isIn(['disponible', 'no disponible']).withMessage('El estado debe ser "disponible" o "no disponible'),
    body('dailyvalue').notEmpty().withMessage('El valor diario del automóvil es obligatorio')
    ], async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), error: true });
        }

        const { platenumber, brand, status, dailyvalue} = req.body;

        try {
            const existingCar = await Car.findOne({ platenumber});

            if (existingCar) {
                return res.json({message: 'La placa del auto ya exite, ingresa otro...'});
            } 
            const newCar = new Car({platenumber, brand, status, dailyvalue});
            await newCar.save();
            res.json({ message: 'Auto agregado correctamente'});
        }catch (error) {
            res.status(400).json({ message: 'Error al guardar el automóvil en la base de datos'});
        }
    }
);

//Ruta GET para ver la lista de autos que solo se encuentran disponibles
routerprod.get('/cars/list', async (req, res) => {
    try {
        // Filtrar autos por estado 'disponible'
        const cars = await Car.find({ status: 'disponible' });

        res.json({ cars }); 
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de automóviles disponibles' });
    }
});

//Ruta GET para buscar un auto en especifico
routerprod.get('/cars/:platenumber', async (req, res) => {
    try {
        const car = await Car.findOne({ platenumber: req.params.platenumber });

        if (!car) {
            return res.status(404).json({ error: 'No se encontró el automóvil' });
        }

        res.json(car);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el automóvil'});
    }
});

//Ruta PUT para actualizar un auto
routerprod.put('/cars/:platenumber',[
    body('brand').optional().notEmpty().withMessage('La marca del automóvil es obligatoria'),
    body('dailyvalue').optional().notEmpty().withMessage('El valor diario del automóvil es obligatorio')
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), error: true });
        }

        try {
            const updatedCar = await Car.findOneAndUpdate({ platenumber: req.params.platenumber }, {
                brand: req.body.brand,
                dailyvalue: req.body.dailyvalue
            }, { new: true });

            if (!updatedCar) {
                return res.status(404).json({ error: 'No se encontró el automóvil para actualizar' });
            }

            res.json(updatedCar);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el automóvil', error: true });
        }
    }
);

//Ruta DELETE para borrar un auto
routerprod.delete('/cars/:platenumber', async (req, res) => {
    try {
        const deletedCar = await Car.findOneAndDelete({ platenumber: req.params.platenumber });

        if (!deletedCar) {
            return res.status(404).json({ error: 'No se encontró el automóvil para eliminar' });
        }

        res.json({ message: 'Auto eliminado con éxito'});
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el automóvil', error: true });
    }
});

module.exports = routerprod;