const mongoose = require('mongoose');

const ComputerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
});

module.exports = mongoose.model('Computer', ComputerSchema);