const express = require('express')
const router = express.Router()
const db = require('../../db')
const sendErrorResponse = require('./toastResponse.js')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require('dotenv').config()


router.use(express.json())
router.post('/', (req, res) => {
    const { email, password, googleAuth } = req.body
    console.log('googleAuth', googleAuth);
    const isprd = process.env.node_env === 'production'
    db.query('select * from admindata.users where upper(email) = upper($1) ', [email], async (err, result) => {
        if (err) {
            console.log('Error while fetching data ' + err);
            return sendErrorResponse(res, "Error", "An error occured while fetching data !")
        }
        if (result.rows.length == 0) {
            return sendErrorResponse(res, "Error", "User not found")
        }
        if (!googleAuth) {
            const passMatch = await bcrypt.compare(password, result.rows[0].password)
            if (!passMatch) return sendErrorResponse(res, "Error", "Incorrect password")
        }

        const finalToken = jwt.sign({ userId: result.rows[0].id, email: result.rows[0].email, user: result.rows[0].username }, process.env.jwt_secret, {
            expiresIn: process.env.jwt_expire
        })
        return res.cookie("token", finalToken, { httpOnly: true, secure: isprd ? true : false, sameSite: isprd ? 'none' : 'lax', maxAge: 3600000 }).json({ "resPath": "/home", "auth": true })

    })
})



module.exports = router