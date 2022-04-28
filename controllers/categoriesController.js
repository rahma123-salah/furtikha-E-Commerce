const Categories = require('../models/categories');
const Products = require('../models/products');

module.exports = {
    getAllCategories: (req, res) => {
        Categories.find({})
                .then(categories => { res.send(categories) })
                .catch((error) => { console.log(error); })
    },
    getCategory: (req, res) =>{
        Categories.findOne({ _id: req.params.categoryId })
            .then(category => { res.send(category) })
            .catch((error) => { console.log(error); })
    },
    addCategory: (req, res) => {
        (new Categories({ 'Name': req.body.Name })).save()
            .then((category) => { res.send(category) })
            .catch((error) => { console.log(error); })
    },
    updateCategory: (req, res) => {
        Categories.findOneAndUpdate({ _id: req.params.categoryId }, { $set: req.body })
            .then((category) => { res.send(category) })
            .catch((error) => { console.log(error); })
    },
    deleteCategory: (req, res) => {
        const deleteProducts = (category) => {
            Products.deleteMany({ CategoryId: category._id })
                .then(() => category)
                .catch((error) => { console.log(error); })
        }
        const category = Categories.findByIdAndDelete(req.params.categoryId)
            .then((category) => { res.send(deleteProducts(category)) })
            .catch((error) => { console.log(error); })
    }
}