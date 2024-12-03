const express = require('express');
const router = express.Router();
const Computer = require('../models/Computer'); // Model za računalnike
const Component = require('../models/Component'); // Model za komponente

// API za pridobitev vseh računalnikov
router.get('/', async (req, res) => {
    try {
        const computers = await Computer.find();
        res.json(computers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API za ustvarjanje novega računalnika
router.post('/', async (req, res) => {
    const computer = new Computer({
        name: req.body.name,
        description: req.body.description,
    });

    try {
        const newComputer = await computer.save();
        res.status(201).json(newComputer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// API za pridobitev vseh komponent za določen računalnik
router.get('/:id/components', async (req, res) => {
    try {
        const components = await Component.find({ computerId: req.params.id });
        res.json(components);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API za dodajanje nove komponente določenemu računalniku
router.post('/:id/components', async (req, res) => {
    const component = new Component({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        user_name: req.body.user_name,
        computerId: req.params.id, // Povezava z računalnikom
    });

    try {
        const newComponent = await component.save();
        res.status(201).json(newComponent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// API for deleting a component
router.delete('/:id/components/:componentId', async (req, res) => {
    try {
        const component = await Component.findByIdAndDelete(req.params.componentId);
        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }
        res.json({ message: 'Component deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
