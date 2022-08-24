const jwt = require("jsonwebtoken");
const { User } = require("../../models/");

const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    const [authType, authValue] = (authorization || " ").split(" ");

    if (!authType || authType !== "Bearer") {
        return res.status(401).json({ message: "로그인 후 이용해주세요." });
    }

    try {
        const userInfo = jwt.verify(authValue, "dive-into-yu");
        const { userId } = userInfo;

        const findByUserId = await User.findOne({ where: { userId } });
        if (findByUserId === null) {
            return res.status(400).json({ message: "알 수 없는 에러" });
        }
        res.locals.userId = userInfo.userId;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError")
            return res.status(419).json({ message: "토큰이 만료되었습니다." });
        if (err.name === "jsonwebtokenError")
            return res.status(401).json({ message: "토큰이 유효하지 않습니다." });
    }
};

module.exports = auth;
