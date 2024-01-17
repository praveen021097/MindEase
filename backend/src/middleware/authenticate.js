const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken =(token) => {

    return new Promise((resolve, reject) => {
    
        var decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN, (err, decoded) => {
            if (err) {
                reject(err)
            }
           
            resolve(decoded)
        })
       
    })
}

const authenticate = async (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(400).send({ message: "authorization token not found!" })
    }
    if (!req.headers.authorization.startsWith("Bearer ")) {
        return res.status(400).send({ message: "authorization token not found!" })
    }

    const token = req.headers.authorization.trim().split(" ")[1];

    let decoded;
    try {
        decoded = await verifyToken(token);
        
    } catch (err) {
        return res.status(400).send({ message: "authentication token not found! " })
    }

    req.user = await User.findById(decoded.id);

    return next()
}

module.exports=authenticate;