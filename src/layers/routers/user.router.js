const { Router } = require("express");
const userRouter = Router();

const UserController = require("../controllers/user.controller");
const userController = new UserController();

userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.login);

module.exports = userRouter;
