const UserRepository = require("../repositories/user.repository");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserService {
    userRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    // repository에 들어갈 인자들 넣어주기
    checkEmail = async (email) => {
        const isExistEmail = await this.userRepository.checkEmail({ email });
        if (isExistEmail === null) return isExistEmail;
        if (isExistEmail.email === email)
            return { isSuccess: false, message: "이미 존재하는 이메일입니다." };
    };

    signUp = async (email, nickname, password) => {
        return await this.userRepository.signUp(email, nickname, password);
    };

    findUser = async (email) => {
        const isExistUser = await this.userRepository.findUser(email);
        return isExistUser;
    };

    login = async (email, password) => {
        const isExistUser = await this.userRepository.findUser(email);
        const hashPassword = isExistUser.password;
        const decodePassword = await bcrypt.compare(password, hashPassword);

        if (isExistUser) {
            if (decodePassword) {
                const payload = {
                    userId: isExistUser.userId,
                };
                const token = jwt.sign(payload, "dive-into-yu");
                return token;
            }
        }
    };

    quit = async (userId, password) => {
        const isExistUser = await this.userRepository.findByUserId(userId);
        if (!isExistUser) throw Error("존재하지 않는 유저입니다.");

        const hashPassword = isExistUser.password;
        const decodePassword = await bcrypt.compare(password, hashPassword);
        if (!decodePassword) throw Error("비밀번호가 일치하지 않습니다.");

        const deleteUser = await this.userRepository.quit(userId);

        return deleteUser;
    };
}

module.exports = UserService;
