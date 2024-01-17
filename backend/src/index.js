const express = require("express");
const {register,login} = require("./controllers/auth.controller");
const userRouter = require("./routes/user.route");

const app = express();
app.use(express.json());
app.use("/api/v1",userRouter)
app.post("/api/v1/register", register);
app.post("/api/v1/login", login);
module.exports= app;