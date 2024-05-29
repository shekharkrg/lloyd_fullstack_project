const {ObjectId} = require('mongodb');
const connectToDB = require('../configurations/dbConnecter');

const getStudentById = async (id) => {
    const collection = await _getCollection();
    
    const student = await collection.findOne({_id: new ObjectId(id) });
    return student;
}

const getStudents = async (id) => {
    const collection = await _getCollection();

    const student = await collection.find({}).toArray();                
    return student;
}

const addStudent = async (student) => {
    const collection = await _getCollection();
    
    const result = await collection.insertOne(student);
    return result;
}

const updateStudent = async (id, student) => {
    const collection = await _getCollection();

    const result = await collection.updateOne(
        { _id: new ObjectId(id.toString()) },
        { $set: student}
    );
    return result;
}

const deleteStudent = async (id) => {
    const collection = await _getCollection();

    const student = await getStudentById(id);

    const result = await collection.deleteOne(student);
    return result;
}

module.exports = {
    getStudentById,
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent
}

//Private members
const collectionName = 'students';
const _getCollection = async () =>  {
    const db = await connectToDB();
    return db.collection(collectionName);
}