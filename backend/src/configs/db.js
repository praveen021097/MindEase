const mongoose = require("mongoose")

const connect =()=>{
    return mongoose.connect("mongodb+srv://admin:ymWe5Apn3vVuP9dP@cluster0.arbknvz.mongodb.net/ecommerce?retryWrites=true&w=majority")
}

module.exports= connect;
