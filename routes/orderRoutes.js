const express = require('express');
const router = express.Router();

const checkAuth = require("../middlewares/auth");

const orderController = require('../controllers/orderController');

router.get('/', orderController.getAllOrders);
router.get('/:orderId', orderController.getOrder);
router.get('/order/:userId', orderController.getUserOrders);
router.get('/orderProduct/:userId/:productId', orderController.getUserOrderProduct);
// router.post('/', orderController.addOrder);
router.post('/', checkAuth, orderController.addOrder);
router.patch('/:orderId', checkAuth, orderController.updateOrder);
router.delete('/:orderId', checkAuth, orderController.deleteOrder);

module.exports = router;