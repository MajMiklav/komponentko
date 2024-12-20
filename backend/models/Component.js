const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    user_name: { type: String, required: true },
    computerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Computer', required: true },
});

module.exports = mongoose.model('Component', ComponentSchema);
