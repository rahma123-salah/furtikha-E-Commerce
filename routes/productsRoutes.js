const express = require('express');
const router = express.Router();

const checkAuth = require("../middlewares/auth");

const productsController = require('../controllers/productsController');

router.get('/', productsController.getAllProducts);
router.get('/filter/:page/:limit', productsController.filterProducts);
router.get('/:productId', productsController.getProduct);
router.get('/search/:productName', productsController.getProductByName);
router.get('/categories/:categoryId', productsController.getProductsByCategory);
// router.post('/', productsController.addProduct);
router.post('/', checkAuth, productsController.addProduct);
router.patch('/:productId', checkAuth, productsController.updateProduct);
router.delete('/:productId', checkAuth, productsController.deleteProduct);

module.exports = router;