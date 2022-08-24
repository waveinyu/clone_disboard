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
        // if (!isExistUser) return { sa };
    };

    login = async (email, password) => {
        const isExistUser = await this.userRepository.findUser(email);
        if (isExistUser) {
            const hashPassword = isExistUser.password;
            const decodePassword = await bcrypt.compare(password, hashPassword);

            if (decodePassword) {
                const payload = {
                    userId: isExistUser.userId,
                };
                const token = jwt.sign(payload, "dive-into-yu");
                return token;
            }
        }

        if (decodePassword) {
            const token = jwt.sign(
                {
                    userId: findUser.userId,
                },
                "wave-key",
            );
            console.log(token);
        }

        // const decodePassword = await bcrypt.compare(password, hashPassword);
        // console.log(decodePassword); //true
        return 0;
    };
}

module.exports = UserService;
