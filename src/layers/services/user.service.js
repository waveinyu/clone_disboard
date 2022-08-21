const UserRepository = require("../repositories/user.repository");

class UserService {
    userRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    // repository에 들어갈 인자들 넣어주기
    signUp = async (req, res, next) => {
        return "Service.signUp";
    };

    login = async () => {
        return "Service.login";
    };
}

module.exports = UserService;
