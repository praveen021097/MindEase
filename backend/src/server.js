const app = require("./index");
const dotenv = require("dotenv");
dotenv.config()
const connect = require("./configs/db");

app.listen(process.env.PORT,async()=>{
    try {
        await connect();
        console.log(`server is listening port ${process.env.PORT}`);
    } catch (err) {
        console.log(err)
        
    }
})