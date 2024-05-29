const studentRepo = require('../repositories/studentRepository');

const getStudentById = async (id) => {
    let student = await studentRepo.getStudentById(id);
    return student;
}

const getStudents = async () => {
    let students = await studentRepo.getStudents();
    return students;
}

const addStudent = async (student) => {
    let result = await studentRepo.addStudent(student);
    return result;
}

const updateStudent = async (id, student) => {
    let result = await studentRepo.updateStudent(id, student);
    return result;
}

const deleteStudent = async (id) => {
    let result = await studentRepo.deleteStudent(id);
    return result;
}

module.exports = {
    getStudentById,
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent
}