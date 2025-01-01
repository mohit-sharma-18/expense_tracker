const express = require('express')
const db = require('../../db.js')
const router = express.Router()

router.use(express.json())

router.post('/', (req, res) => {
    console.log('req', req.body);
    const { username, email, password, confirmPass } = req.body
    db.query('insert into admindata.users(username,email,password) values($1,$2,$3)', [username, email, password], (err, result) => {
        if (err) {
            console.log('Error while insert data ' + err);
            return res.json({
                "toastHeader": "Error",
                "toastMsg": "Internal Server Error",
                "toastColor": "red",
                "toastIcon": "fa-close"
            })
        }
        res.status(200).json({
            "toastHeader": "Success",
            "toastMsg": "Account created successfully.",
            "toastColor": "green",
            "toastIcon": "fa-check"
        })
    })
})

module.exports = router