const jwt = require('jsonwebtoken');
const { getUserById } = require('../services/userServices')

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization');
    //return error if token not present
    if (!token) return res.status(401).send({error: "Unauthorized user"});

    let tokenData;
    try {
        tokenData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.log(error);
        return res.status(401).send({error: "Invalid Token"});
    }
    
    const user = await getUserById(tokenData.userId)
    if (!user) return res.status(401).send({error: "Unauthorized user"});

    next();
}

module.exports = {
    verifyToken
}