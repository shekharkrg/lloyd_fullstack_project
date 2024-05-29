const userService = require('../services/userServices');
const CreteUserModel = require('../models/createUserModel');

const createUser = async (req, res) => {
    try {
        const createUserModel = new CreteUserModel(
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password,
            "Admin"
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

        const result = await userService.login(email, password, true);

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
        const result = users.map(user => {
            return {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            };
        });
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({error: "Internal Server Error"});
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        let user = await userService.getUserById(id);
        if (user)
            res.send({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            });
        else
            res.status(400).send("Not Found");
    } catch (error) {
        console.log(error);
        res.status(500).send({error: "Internal Server error"});
    }
}

const updateUser = async (req, res) => {
    try {
        let user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role
        };
        let result = await userService.updateUser(req.params.id, user);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({error: "Internal Server error"});
    }
}

const deleteUser = async (req, res) => {
    try {
        let result = await userService.deleteUser(req.params.id);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({error: "Internal Server error"});
    }
}

//Export Controller Functions
module.exports = {
    createUser,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}