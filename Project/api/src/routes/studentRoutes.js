const express = require('express');

//Import Custom Middlewares
const verifyTokenMiddleWare = require('../middleware/verifyToken');

//Importing controllers
const studentController = require('../controllers/studentController');

//Creating route object
const router = new express.Router();

//Configuring routes in router
router.get('/student/all', verifyTokenMiddleWare.verifyToken, studentController.getStudents);
router.get('/student/:id', verifyTokenMiddleWare.verifyToken, studentController.getStudentById);
router.post('/student', verifyTokenMiddleWare.verifyToken, studentController.addStudent);
router.put('/student/:id', verifyTokenMiddleWare.verifyToken, studentController.updateStudent);
router.delete('/student/:id', verifyTokenMiddleWare.verifyToken, studentController.deleteStudent);

//export
module.exports = router;