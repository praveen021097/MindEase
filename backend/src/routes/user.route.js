const express = require("express");
const { getAllUser, getSingleUser } = require("../controllers/user.controller");
const router =express.Router();

router.route("/users").get(getAllUser);
router.route("/users/:id").get(getSingleUser);

module.exports =router;