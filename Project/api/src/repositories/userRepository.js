const { ObjectId } = require('mongodb');
const connectToDB = require('../configurations/dbConnecter');

const createUser = async (createUserModel) => {
    const collection = await _getCollection();
    
    const result = await collection.insertOne(createUserModel);
    return result;
}

const getAllUsers = async () => {
    const collection = await _getCollection();
    
    const users = await collection.find({}).toArray();
    return users;
}

const findUserById = async (id) => {
    const collection = await _getCollection();
    
    const user = await collection.findOne({ _id: new ObjectId(id) });
    return user;
}

const findUserByEmail = async (email) => {
    const collection = await _getCollection();

    const user = await collection.findOne({ email: email });
    return user;
}

const findUserByEmailAndPassword = async (email, password) => {
    const collection = await _getCollection();

    const user = await collection.findOne({ email: email, password: password });
    return user;
}

const updateUser = async (id, student) => {
    const collection = await _getCollection();

    const result = await collection.updateOne(
        { _id: new ObjectId(id.toString()) },
        { $set: student}
    );
    return result;
}

const deleteUser = async (id) => {
    const collection = await _getCollection();

    const user = await findUserById(id);

    const result = await collection.deleteOne(user);
    return result;
}

module.exports = {
    createUser,
    getAllUsers,
    findUserById,
    findUserByEmail,
    findUserByEmailAndPassword,
    updateUser,
    deleteUser
}

//Private members
const collectionName = 'users';
const _getCollection = async () =>  {
    const db = await connectToDB();
    return db.collection(collectionName);
}