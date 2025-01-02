const express = require('express')
const db = require('../../db.js')
const router = express.Router()
const sendErrorResponse = require('./toastResponse.js')

router.use(express.json())

router.post('/', (req, res) => {
    console.log('req', req.body);
    const { username, email, password, confirmPass } = req.body
    db.query('insert into admindata.users(username,email,password) values($1,$2,$3)', [username, email, password], (err, result) => {
        if (err) {
            console.log('Error while insert data ' + err);
            return sendErrorResponse(res, "Error", "Internal Server Error")
        }
        sendErrorResponse(res.status(200), "Success", "Account created successfully.")
    })
})

module.exports = router