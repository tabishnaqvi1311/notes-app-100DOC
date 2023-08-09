const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const isUserAuthenticated = async (req, res, next) => {
    //get the user from jwt
    const token = req.header('auth-token');
    if (!token) return res.status(401).json("Unauthorized");

    try {
        const data = jwt.verify(token, "jwtSECRET");
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({"Token ERR": error.message});
    }
}

module.exports = isUserAuthenticated;