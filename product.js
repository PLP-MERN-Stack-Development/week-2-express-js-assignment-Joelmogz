const express = require('express');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    instock: { type: Boolean, default: false },
});

module.exports = mongoose.model('Product', productSchema);
