const express = require('express');

//Import Custom Middlewares
const verifyTokenMiddleWare = require('../middleware/verifyToken');

//Import Controllers
const userController = require('../controllers/userController');

//Creating router
const router = new express.Router();

//Configuring Routes
router.post('/signup', userController.createUser);
router.post('/login', userController.login);

//Exporting Router
module.exports = router;