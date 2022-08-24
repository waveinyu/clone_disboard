const express = require("express");
const UserService = require("../services/user.service");
const joi = require("joi");

class UserController {
    userService;

    constructor() {
        this.userService = new UserService();
    }

    signUp = async (req, res, next) => {
        console.log(req.body);
        const { email, nickname, password, confirm } = req.body;

        try {
            await joi.object({
                email: joi.string().required(),
                nickname: joi.string().required(),
                password: joi.string().
            });
        } catch (err) {}
        const createUser = await this.userService.signUp(email, nickname, password, birth);
        return { status: 200, isSuccess: true, createUser };
    };

    login = async (req, res, next) => {
        return res.send("연결 완료2");
    };
}

module.exports = UserController;
