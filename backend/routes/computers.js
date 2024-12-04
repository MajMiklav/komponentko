const express = require('express');
const mongoose = require('mongoose');
const Computer = require('../models/Computer');
const Component = require('../models/Component');
const router = express.Router();

// API for getting all computers
router.get('/', async (req, res) => {
    try {
        const computers = await Computer.find();
        res.json(computers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API for creating a new computer
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

// API for getting components of a specific computer
router.get('/:id/components', async (req, res) => {
    try {
        const components = await Component.find({ computerId: req.params.id });
        res.json(components);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API for adding a component to a specific computer
router.post('/:id/components', async (req, res) => {
    const component = new Component({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        user_name: req.body.user_name,
        computerId: req.params.id,
    });

    try {
        const newComponent = await component.save();
        res.status(201).json(newComponent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// API for deleting a component from a specific computer
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

// API for deleting a specific computer
router.delete('/:id', async (req, res) => {
    try {
        const computerId = req.params.id;

        // Try to find and delete the computer
        const deletedComputer = await Computer.findByIdAndDelete(computerId);

        // If computer was not found, send a 404 response
        if (!deletedComputer) {
            return res.status(404).json({ message: 'Computer not found' });
        }

        // If deleted successfully, send a success message
        res.status(200).json({ message: 'Computer deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API for calculating the average price of components for a specific computer
router.get('/:id/average-price', async (req, res) => {
    try {
        const computerId = new mongoose.Types.ObjectId(req.params.id);
        const result = await Component.aggregate([
            { $match: { computerId: computerId } },
            { $group: { _id: null, avgPrice: { $avg: "$price" } } }
        ]);

        const averagePrice = result.length > 0 ? result[0].avgPrice : 0;
        res.json({ averagePrice });
    } catch (err) {
        res.status(500).json({ message: 'Server error calculating average price' });
    }
});

// API for getting the average price of all components
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