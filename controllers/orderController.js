const order = require('../models/order');

module.exports = {
    getAllOrders: (req, res) => {
        order.find({})
                .then(orders => { res.send(orders) })
                .catch((error) => { console.log(error); })
    },
    getOrder: (req, res) =>{
        order.findOne({ _id: req.params.orderId })
            .then(order => { res.send(order) })
            .catch((error) => { console.log(error); })
    },
    getUserOrderProduct: (req, res) =>{
        order.find({ UserId: req.params.userId, ProductId: req.params.productId })
            .then(order => { res.send(order) })
            .catch((error) => { console.log(error); })
    },
    getUserOrders: (req, res) =>{
        order.find({ UserId: req.params.userId })
            .then(order => { res.send(order) })
            .catch((error) => { console.log(error); })
    },
    addOrder: (req, res) => {
        (new order({ 
            'Name': req.body.Name,
            'Price': req.body.Price,
            'Amount': req.body.Amount,
            'ProductId': req.body.ProductId,
            'UserId': req.body.UserId,
            'TimeStamp': req.body.TimeStamp,
            'Image': req.body.Image,
            'Status': req.body.Status
            // 'Products': req.body.Products,
            }))
            .save()
            .then((order) => { res.send(order) })
            .catch((error) => { console.log(error); })
    },
    updateOrder: (req, res) => {
        order.findOneAndUpdate({ _id: req.params.orderId }, { $set: req.body })
            .then((order) => { res.send(order) })
            .catch((error) => { console.log(error); })
    },
    deleteOrder: (req, res) => {
        order.findByIdAndDelete( req.params.orderId )
            .then((order) => order)
            .catch((error) => { console.log(error); })
    }
}