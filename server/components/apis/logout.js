const express = require('express')
const router = express.Router()
const authToken = require('../../common/authentication')
const isprd = process.env.node_env === 'production'
require('dotenv').config()

router.post('/', authToken, (req, res) => {
    res.clearCookie("token",
        {
            httpOnly: true,
            secure: isprd ? true : false,
            sameSite: isprd ? 'none' : 'lax'
        })
    console.log('session destroyed');
    return res.json({ "resPath": "/login", "auth": false })
})
module.exports = router