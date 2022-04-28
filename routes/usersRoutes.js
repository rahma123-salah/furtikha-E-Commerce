const express = require('express');
const router = express.Router();

const checkAuth = require("../middlewares/auth");

const usersController = require('../controllers/usersController');

//router.post('/login', auth, usersController.login);
//router.post('/logout', usersController.logout);
router.post('/login', usersController.login);
router.post('/signup', usersController.signup);
router.get('/admin/', usersController.getAllUsers);
router.get('/admin/:userId', usersController.getUser);
router.get('/admin/search/:userName', usersController.getUserByName);
router.post('/admin', checkAuth, usersController.addUser);
router.patch('/admin/:userId', checkAuth, usersController.updateUser);
router.delete('/admin/:userId', checkAuth, usersController.deleteUser);

module.exports = router;