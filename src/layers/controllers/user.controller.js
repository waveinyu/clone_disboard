const express = require("express");
const UserService = require("../services/user.service");
const joi = require("joi");
const bcrypt = require("bcrypt");
const { object } = require("joi");

class UserController {
    userService;

    constructor() {
        this.userService = new UserService();
    }

    test = async (req, res) => {
        console.log("안녕");
        res.send("Hello");
    };

    signUp = async (req, res, next) => {
        const { email, nickname, password, confirm } = req.body;
        if (!email || !nickname || !password) {
            return res.status(400).json({
                isSuccess: false,
                message: "이메일, 닉네임, 비밀번호는 필수 입력 사항입니다.",
            });
        }

        if (!confirm) {
            return res
                .status(400)
                .json({ isSuccess: false, message: "비밀번호 확인을 입력해주세요." });
        }

        if (password !== confirm) {
            return res
                .status(400)
                .json({ isSuccess: false, message: "비밀번호가 일치하지 않습니다." });
        }
        try {
            await joi
                .object({
                    email: joi.string().email().required(),
                    nickname: joi.string().min(2).required(),
                    password: joi.string().required(),
                    confirm: joi.ref("password"),
                })
                .validateAsync({ email, nickname, password, confirm });

            const isExistEmail = await this.userService.checkEmail(email);
            if (isExistEmail) return res.status(400).json({ result: isExistEmail });

            const hashPassword = await bcrypt.hash(password, 12);
            const createUser = await this.userService.signUp(email, nickname, hashPassword);

            return res
                .status(201)
                .json({ isSuccess: true, result: createUser, message: "회원가입에 성공했습니다." });
        } catch (err) {
            return res
                .status(400)
                .json({ isSuccess: false, message: "입력한 형식이 올바르지 않습니다." });
        }
    };

    login = async (req, res, next) => {
        const { email, password } = req.body;
        try {
            await joi
                .object({
                    email: joi.string().required().email(),
                    password: joi.string().required(),
                })
                .validateAsync({ email, password });

            const findUser = await this.userService.findUser(email);

            if (!findUser)
                return res
                    .status(400)
                    .json({ isSuccess: false, message: "존재하지 않는 이메일입니다." });

            const login = await this.userService.login(email, password);

            if (login === undefined) {
                return res.status(400).json({
                    isSuccess: false,
                    message: "이메일 또는 비밀번호가 일치하지 않습니다.",
                });
            }
            console.log("req", req.headers);

            return res
                .status(200)
                .json({ isSuccess: true, message: "로그인 성공! 환영합니다.", result: login });
        } catch (err) {
            return res
                .status(400)
                .json({ isSuccess: false, message: "입력한 형식이 올바르지 않습니다." });
        }
    };
}

module.exports = UserController;
