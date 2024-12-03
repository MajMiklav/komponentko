const express = require('express');
const mongoose = require('mongoose');
const Computer = require('../models/Computer'); // Model za računalnike
const Component = require('../models/Component'); // Model za komponente
const router = express.Router();

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

// API to calculate the average price of components for a specific computer
router.get('/:id/average-price', async (req, res) => {
    try {
        // Convert the provided ID to an ObjectId
        const computerId = new mongoose.Types.ObjectId(req.params.id);

        // Log the ID being queried
        console.log('Computer ID being queried:', computerId);

        // Run the aggregation pipeline
        const result = await Component.aggregate([
            { $match: { computerId: computerId } },
            { $group: { _id: null, avgPrice: { $avg: "$price" } } }
        ]);

        // Log the aggregation result
        console.log('Aggregation Result:', result);

        // Check if the result is empty and respond appropriately
        const averagePrice = result.length > 0 ? result[0].avgPrice : 0;

        res.json({ averagePrice });
    } catch (err) {
        console.error('Error calculating average price:', err);
        res.status(500).json({ message: 'Server error calculating average price' });
    }
});



// API to get the average price of all components
router.get('/average-price/all', async (req, res) => {
    try {
        const averagePrice = await Component.aggregate([
            { $group: { _id: null, avgPrice: { $avg: "$price" } } }
        ]);
        res.json({ averagePrice: averagePrice[0]?.avgPrice || 0 });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
