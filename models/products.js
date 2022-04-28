const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    Name: {
        type: 'string',
        required: true,
        minLength: 3
    },
    Description: {
        type: 'string',
        required: true,
        minLength: 3
    },
    CategoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'categories',
        required: true,
    },
    Price: {
        type: 'number',
        required: true,
    },
    Image: {
        type: 'string',
    },
})

const ProductModel = mongoose.model('products', ProductSchema);

module.exports = ProductSchema;

module.exports = ProductModel;