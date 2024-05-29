const studentService = require('../services/studentService');
const Student = require('../models/studentModel');

const getStudentById = async (req, res) => {
    try {
        const id = req.params.id;
        let result = await studentService.getStudentById(id);
        if (result)
            res.send(result);
        else
            res.status(400).send("Not Found");
    } catch (error) {
        console.log(error);
        res.status(500).send({error: "Internal Server error"});
    }
}

const getStudents = async (req, res) => {
    try {
        let result = await studentService.getStudents();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({error: "Internal Server error"});
    }
}

const addStudent = async (req, res) => {
    try {
        let student = new Student(req.body.name, req.body.email, req.body.course);
        let result = await studentService.addStudent(student);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({error: "Internal Server error"});
    }
}

const updateStudent = async (req, res) => {
    try {
        let student = new Student(req.body.name, req.body.email, req.body.course);
        let result = await studentService.updateStudent(req.params.id, student);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({error: "Internal Server error"});
    }
}

const deleteStudent = async (req, res) => {
    try {
        let result = await studentService.deleteStudent(req.params.id);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({error: "Internal Server error"});
    }
}

module.exports = {
    getStudentById,
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent
}