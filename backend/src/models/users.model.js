const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const bcrypt = require("bcrypt");
dotenv.config()


// userSchema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
   
}, {
    versionKey:false,
    timestamps:true
}) 

// user model
userSchema.pre("save",async function(next){
    
    const hashPassword = await bcrypt.hash(this.password,10);
    this.password = hashPassword;
      return next()
})

userSchema.methods.checkPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateToken= function (){
    return jwt.sign({id:this._id},`${process.env.SECRET_KEY_TOKEN}`,{
        expiresIn:process.env.TOKEN_EXPIRE * 24 * 60 * 60 * 1000,
    });
}

module.exports = mongoose.model("user",userSchema);