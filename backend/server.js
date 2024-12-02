const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const componentRoutes = require('./routes/components');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB povezava
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.get('/', (req, res) => res.send('API is running'));
app.use('/api/components', componentRoutes);

// Server poslušanje
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


