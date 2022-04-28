const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = (req.body.token || req.query.token || req.headers["authorization"]).split(" ")[1];
        const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
        req.userData = { email: decodedToken.email, userId: decodedToken.userId, isAdmin: decodedToken.isAdmin };
        next();
    } catch (error) {
        res.status(401).json({ message: "Auth failed!" });
    }
};




// const jwt = require("jsonwebtoken");

// const dotenv = require('dotenv');
// // get config vars
// dotenv.config();
// // access config var
// process.env.TOKEN_KEY

// const config = process.env;

// const verifyToken = async (req, res, next) => {
//     const token = await req.body.token || req.query.token || req.headers["Authorization"];

//     if (!token) {
//         return res.status(403).send("A token is required for authentication");
//     }
//     try {
//         const decoded = jwt.verify(token, config.TOKEN_KEY);
//         req.user = decoded;
//     } catch (err) {
//         return res.status(401).send("Invalid Token");
//     }
//     return next();
// };

// module.exports = verifyToken;