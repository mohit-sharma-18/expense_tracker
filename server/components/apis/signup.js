const express = require('express')
const db = require('../../db.js')
const router = express.Router()
const sendErrorResponse = require('./toastResponse.js')
const bcrypt = require('bcryptjs')

router.use(express.json())

router.post('/', async (req, res) => {
    console.log('req', req.body);
    const { username, email, password, confirmPass } = req.body
    const checkUserExist = await db.query('select * from admindata.users where upper(email) = upper($1)', [email])
    if (checkUserExist.rows.length > 0) return sendErrorResponse(res, "Warning", "User already exists.")
    const hashedPass = await bcrypt.hash(password, 10)
    db.query('insert into admindata.users(username,email,password) values($1,$2,$3)', [username, email, hashedPass], (err, result) => {
        if (err) {
            console.log('Error while insert data ' + err);
            return sendErrorResponse(res, "Error", "Internal Server Error")
        }
        sendErrorResponse(res.status(200), "Success", "Account created successfully.")
    })
})

module.exports = router