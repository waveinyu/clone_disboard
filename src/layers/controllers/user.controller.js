const express = require("express");
const UserService = require("../services/user.service");

class UserController {
    userService;

    constructor() {
        this.userService = new UserService();
    }

    signUp = async (req, res, next) => {
        return res.send("연결 완료");
    };

    login = async (req, res, next) => {
        return res.send("연결 완료2");
    };
}

module.exports = UserController;
