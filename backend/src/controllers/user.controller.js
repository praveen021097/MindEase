const User = require("../models/users.model");

module.exports.getAllUser = async(req,res)=>{
    try {
        const users = await User.find().lean().exec();
        return res.status(200).send(users);
    } catch (err) {
        return res.status(500).send({message:"something went wrong!"})
    }
}

module.exports.getSingleUser = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send({message:"something went wrong!"})
    }
}