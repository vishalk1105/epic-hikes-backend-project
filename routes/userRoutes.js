const express = require("express");
const { userRegister, userLogin } = require("../controller/userController.js");
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
module.exports = userRouter;
