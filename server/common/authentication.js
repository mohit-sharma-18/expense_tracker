const jwt = require("jsonwebtoken")
const sendErrorResponse = require("../components/apis/toastResponse")
require("dotenv").config()

const authToken = (req, res, next) => {
    const validToken = req.cookies.token
    if (!validToken) {
        return sendErrorResponse(res.status(401), "Error", "Access Denied!!")
    }
    try {
        const verifyToken = jwt.verify(validToken, process.env.jwt_secret)
        req.user = verifyToken
        next()
    }
    catch (err) {
        console.log('token err', err);
        return sendErrorResponse(res.status(401), "Error", "Access Denied!!")
    }
}

module.exports = authToken