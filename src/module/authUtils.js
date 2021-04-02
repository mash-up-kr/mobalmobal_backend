const jwt = require('./jwt');
const statusCode = require('./statusCode');

const authUtil = {
    isLoggedin: async(req, res, next) => {
        var token = req.headers.authorization;
        if (!token) {
            return res.json({
                code: statusCode.BAD_REQUEST, 
                data: "빈 토큰입니다."
            });
        } else {
            const user = jwt.verify(token);

            if (user == -3) {
                return res.json({
                    code: statusCode.BAD_REQUEST, 
                    data: "만료된 토큰입니다."
                });
            } else if (user == -2) {
                return res.json({
                    code: statusCode.BAD_REQUEST, 
                    data: "잘못된 형식의 토큰입니다."
                });
            } else {
                req.decode = user;
                next();
            }
        }
    },
};

module.exports = authUtil;