const express = require('express');
const Component = require('../models/Component');
const router = express.Router();

// GET all components
router.get('/', async (req, res) => {
    try {
        const components = await Component.find();
        res.json(components);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new component
router.post('/', async (req, res) => {
    const component = new Component({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price, // Include price
        user_name: req.body.user_name, // Include user_name
    });

    try {
        const newComponent = await component.save();
        console.log('Saved component:', newComponent);
        res.status(201).json(newComponent);
    } catch (err) {
        console.error('Error saving component:', err);
        res.status(400).json({ message: err.message });
    }
});

router.get('/average-price', async (req, res) => {
    try {
        const average = await Component.aggregate([
            { $group: { _id: null, averagePrice: { $avg: '$price' } } }
        ]);
        res.json(average[0] || { averagePrice: 0 });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/average-price/:name', async (req, res) => {
    try {
        const average = await Component.aggregate([
            { $match: { name: req.params.name } },
            { $group: { _id: null, averagePrice: { $avg: '$price' } } }
        ]);
        res.json(average[0] || { averagePrice: 0 });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
