const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const userRepo = require('../repositories/userRepository');

const createUser = async (createUserModel) => {
    const hashedPassword = await bcryptjs.hash(createUserModel.password, 10);
    createUserModel.password = hashedPassword;
    const user = await userRepo.findUserByEmail(createUserModel.email);
    if (user) return;

    const result = await userRepo.createUser(createUserModel);
    if (result)
        return { message: 'User Created Successfully' };
    else 
        throw new Error('User creation failed');
}

const login = async (email, password, isAdmin) => {
    const user = await userRepo.findUserByEmail(email);
    if(user) {
        if (isAdmin && user.role !== "Admin") return;
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) return;
        const token = jwt.sign(
            { userId: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }); //1d, 1h, 1m, 60s, 500
        return {
            token: token,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    }
    return;
}

const getAllUsers = async () => {
    const users = await userRepo.getAllUsers();
    return users;
}

const getUserById = async (id) => {
    const user = await userRepo.findUserById(id);
    return user;
}

const updateUser = async (id, user) => {
    let result = await userRepo.updateUser(id, user);
    return result;
}

const deleteUser = async (id) => {
    let result = await userRepo.deleteUser(id);
    return result;
}

module.exports = {
    createUser,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}