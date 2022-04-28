const mongoose = require('mongoose');
//const ProductSchema = require('./products').ProductSchema

const OrderSchema = mongoose.Schema({
    Name: {
        type: 'string',
        required: true
    },
    Price: {
        type: 'number',
        required: true
    },
    Amount: {
        type: 'number',
        required: true
    },
    UserId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    ProductId: {
        type: mongoose.Types.ObjectId,
    },
    TimeStamp: {
        type: 'string'
    },
    Image: {
        type: 'string'
    },
    Status: {
        type: 'string', 
        enum: ['waiting', 'confirmed', 'canceled']
    }
    // Products: {
    //     type: [ProductSchema]
    // },
})

const OrderModel = mongoose.model('order', OrderSchema);

module.exports = OrderModel;