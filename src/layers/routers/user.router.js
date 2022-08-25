const { Router } = require("express");
const userRouter = Router();

const UserController = require("../controllers/user.controller");
const userController = new UserController();
const authMiddleware = require("../middlewares/auth.middleware");

userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.login);
userRouter.post("/quit", authMiddleware, userController.quit);
userRouter.get("/test", authMiddleware, userController.test);

module.exports = userRouter;
