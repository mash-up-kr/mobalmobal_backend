var randtoken = require('rand-token');
const jwt = require('jsonwebtoken');
const secretOrPrivateKey = "jwtSecretKey!";
const options = {
    algorithm: "HS256",
    expiresIn: "1y",
    issuer: "hyeoni"
};

module.exports = {
    sign: (user) => {
        const payload = {
            user_id : user.user_id,
        }
        const result = {
            token: jwt.sign(payload, secretOrPrivateKey, options),
            refreshToken: randtoken.uid(256)
        };
        return result;
    },

    verify: (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secretOrPrivateKey);
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return -3;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                return -2;
            } else {
                console.log("invalid token");
                return -2;
            }
        }
        return decoded;
    }
};