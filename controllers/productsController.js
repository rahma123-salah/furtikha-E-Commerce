const { promise, reject } = require('bcrypt/promises');
const { default: mongoose } = require('mongoose');
const Products = require('../models/products');

module.exports = {
    getAllProducts: (req, res) =>{
        Products.find({})
            .then((products) => { res.send(products) })
            .catch((error) => {{ console.log(error); }})

        // const DB_URL = 'mongodb://localhost:27017/Fruitkha'
        // return new Promise((resolve, reject) => {
        //     mongoose.connect(DB_URL).then(() => {
        //         return Products.find({})
        //     }).then((products) => {
        //         mongoose.disconnect()
        //         resolve(products)
        //     }).catch((error) => {
        //         reject(error)
        //     })
        // })
        //
        // getAllProducts().then((products) => {
        //     res.render('products', {
        //         products: products
        //     })
        // })
    },
    getProduct: (req, res) => {
        Products.find({ _id: req.params.productId })
            .then((product) => { res.send(product) })
            .catch((error) => { console.log(error);})
    },
    getProductsByCategory: (req, res) => {
        Products.find({ CategoryId: req.params.categoryId })
            .then((products) => { res.send(products) })
            .catch((error) => { console.log(error);})
    },
    getProductByName: (req, res) => {
        Products.find({ Name: req.params.productName })
            .then((product) => { res.send(product) })
            .catch((error) => { console.log(error); })
    },
    filterProducts: async (req, res) => {
        let { page, limit } = req.params;
        const size = await Products.count().exec();
        const skip = (page || 1 - 1) * (limit || 10);
        const pages = Math.ceil(+size / +(limit || 10));
        const products = await Products.find({}).limit(limit).skip(skip).exec();
        //const products = await Products.find({}).populate('categories').limit(limit).skip(skip).exec();

        if (size == 0) {
            return res.status(400).json({
                message: "Products not found"
            });
        }
        res.send(products);
    },
    addProduct: (req, res) => {
        (new Products({ 'Name': req.body.Name.toLowerCase(),
                        'Description': req.body.Description,
                        'Price': req.body.Price,
                        'Image': req.body.Image,
                        'CategoryId': req.body.CategoryId})).save()
            .then((product) => { res.send(product) })
            .catch((error) => { console.log(error); })
    },
    updateProduct: (req, res) => {
        //Products.updateOne({ _id: req.params.productId }, { $set: req.body })
        Products.findOneAndUpdate({ _id: req.params.productId }, { $set: req.body })
            .then((product) => { res.send(product) })
            .catch((error) => { console.log(error); })
    },
    deleteProduct: (req, res) => {
        //Products.deleteOne({ _id: req.params.productId })
        Products.findByIdAndDelete( req.params.productId )
            .then((product) => product)
            .catch((error) => { console.log(error); })
    }
}