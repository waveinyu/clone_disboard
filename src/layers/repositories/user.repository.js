const { User } = require("../../models/");

class UserRepository {
    constructor() {}

    // controller에서 받은 인자 그대로 넣기
    checkEmail = async (email) => {
        const isExistEmail = await User.findOne({ where: email });
        return isExistEmail;
    };

    signUp = async (email, nickname, password) => {
        const user = await User.create({ email, nickname, password });
        return user;
    };

    findUser = async (email) => {
        const isExistUser = await User.findOne({ where: { email } });
        return isExistUser;
    };

    login = async (email, password) => {
        const login = await User.findOne({ where: { email, password } });
        return login;
    };

    findByUserId = async (userId) => {
        const findByUserId = await User.findOne({ where: { userId } });
        return findByUserId;
    };

    quit = async (userId) => {
        const deleteUser = await User.destroy({ where: { userId } });
        return deleteUser;
    };
}

module.exports = UserRepository;
