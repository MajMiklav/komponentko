const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const computerRoutes = require('./routes/computers'); // Pot za računalnike

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB povezava
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.get('/', (req, res) => res.send('API is running'));
app.use('/api/computers', computerRoutes); // Dodaj pot za računalnike

// Server poslušanje
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
