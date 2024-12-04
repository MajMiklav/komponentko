const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const computerRoutes = require('./routes/computers'); // Path for computer routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit process if MongoDB connection fails
    });

// Routes
app.get('/', (req, res) => res.send('API is running'));
app.use('/api/computers', computerRoutes); // Add route for computers

// Conditionally Start the Server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export the app for testing
module.exports = app;
