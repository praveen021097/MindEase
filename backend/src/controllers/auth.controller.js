const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
console.log("sd",process.env.SECRET_TOKEN_KEY)
const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_TOKEN_KEY);
  };
const register =async(req,res)=>{
    try {

        const {name ,email,password} = req.body;
        let user = await User.findOne({email:req.body.email});

        // if user is already exists throw message user is already exists
        if(user){
            return res.status(400).send("user already exists!")
        }
     
       user= await User.create({name,email,password});
       
       const token =await  user.generateToken();
      
       return res.status(201).send({user,token});
    } catch (err) {
        return res.status(500).send({message:"something went wrong!"})
    }
}
//login
const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ message: "enter email and password !" })
        }
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: "wrong email or user not exists !" })
        }
     
        const match = await user.checkPassword(password);

        if (!match) {
            return res.status(400).send({ message: "wrong password!" })
        }
        const token =  await user.generateToken()


        return res.status(201).send({
            success: true,
            user,
            token
        })
    } catch (err) {
        return res.status(500).send({ message:err.message })
    }
}
module.exports = { register, login }
