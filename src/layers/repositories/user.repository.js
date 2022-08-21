const { User } = require("../../models/");

class UserRepository {
    constructor() {}

    // controller에서 받은 인자 그대로 넣기
    signUp = async () => {
        return "Hello";
    };

    login = async () => {
        return "Hi";
    };
}

module.exports = UserRepository;
