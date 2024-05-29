const userService = require('../services/userServices');
const CreteUserModel = require('../models/createUserModel');

const createUser = async (req, res) => {
    try {
        const createUserModel = new CreteUserModel(
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password,
            "User"
        );

        const result = await userService.createUser(createUserModel);

        if (result) {
            res.status(201).send(result);
        }
        else {
            res.status(400).send({error:"Duplicate user"});
        }        
    } catch (error) {
        console.error(error);
        res.status(500).send({error: "Internal Server Error"});
    }
}

const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;        

        const result = await userService.login(email, password, false);

        if (result) {
            res.status(200).send(result);
        }
        else {
            res.status(400).send({error:"Invalid credentials"});
        }        
    } catch (error) {
        console.error(error);
        res.status(500).send({error: "Internal Server Error"});
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({error: "Internal Server Error"});
    }
}

//Export Controller Functions
module.exports = {
    createUser,
    login,
    getAllUsers
}