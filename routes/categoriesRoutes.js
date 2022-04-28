const express = require('express');
const router = express.Router();

const checkAuth = require("../middlewares/auth");

const categoriesController = require('../controllers/categoriesController');

router.get('/', categoriesController.getAllCategories);
router.get('/:categoryId', categoriesController.getCategory);
router.post('/', checkAuth, categoriesController.addCategory);
router.patch('/:categoryId', checkAuth, categoriesController.updateCategory);
router.delete('/:categoryId', checkAuth, categoriesController.deleteCategory);

module.exports = router;