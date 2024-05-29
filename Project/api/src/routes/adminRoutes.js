const express = require('express');

//Import Custom Middlewares
const adminMiddleWare = require('../middleware/isAdmin');

//Import Controllers
const adminController = require('../controllers/adminController');

//Creating router
const router = new express.Router();

//Configuring Routes
router.post('/admin/signup', adminController.createUser);
router.post('/admin/login', adminController.login);

router.get('/user/all', adminMiddleWare.isAdmin, adminController.getAllUsers);
router.get('/user/:id', adminMiddleWare.isAdmin, adminController.getUserById);
router.put('/user/:id', adminMiddleWare.isAdmin, adminController.updateUser);
router.delete('/user/:id', adminMiddleWare.isAdmin, adminController.deleteUser);

//Exporting Router
module.exports = router;