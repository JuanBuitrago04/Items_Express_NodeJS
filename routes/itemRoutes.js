const express = require('express');
const router = express.Router();
const { getAllItems, addItem } = require('../models/itemModel');

// Obtener todos los articulos
router.get('/', (req, res) => {
    getAllItems((err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener articulos' });
        res.json(results);
    });
});

// Agregar un nuevo articulo
router.post('/', (req, res) => {
    addItem(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al insertar artículo' });
        res.status(201).json({ message: 'Artículo creado', id: result.insertId });
    });
});

module.exports = router;
