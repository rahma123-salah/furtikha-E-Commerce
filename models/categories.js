const mongoose = require('mongoose');

const CategoriesSchema = mongoose.Schema({
    Name: {
        type: 'string',
        required: true,
        minLength: 3
    }
})

const CategoriesModel = mongoose.model('categories', CategoriesSchema);

module.exports = CategoriesModel;