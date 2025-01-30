const jwt = require("jsonwebtoken")
const sendErrorResponse = require("../components/apis/toastResponse")
require("dotenv").config()

const authToken = (req, res, next) => {
    console.log('cookieeee--',req.cookies);
    
    const validToken = req.cookies.token
    if (!validToken) {
        return sendErrorResponse(res, "Error", "Access Denied!!")
    }
    try {
        const verifyToken = jwt.verify(validToken, process.env.jwt_secret)
        console.log('verifyToken', verifyToken);
        req.user = verifyToken
        next()
    }
    catch (err) {
        console.log('token err', err);
        return sendErrorResponse(res, "Error", "Access Denied!!")
    }
}

module.exports = authToken