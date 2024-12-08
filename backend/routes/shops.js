const express = require('express');
const Shop = require('../models/Shop');
const router = express.Router();

// API to get all shops
router.get('/', async (req, res) => {
    try {
        const shops = await Shop.find();
        res.json(shops);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching shops' });
    }
});

module.exports = router;
