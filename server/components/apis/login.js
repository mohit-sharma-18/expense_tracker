const express = require('express')
const router = express.Router()
const db = require('../../db')
const sendErrorResponse = require('./toastResponse.js')

router.use(express.json())
router.post('/', (req, res) => {
    const { email, password } = req.body
    db.query('select * from admindata.users where email = $1 AND password = $2', [email, password], (err, result) => {
        if (err) {
            console.log('Error while fetching data ' + err);
            return sendErrorResponse(res, "Error", "An error occured while fetching data !")
        }
        if (result.rows.length == 0) {
            return sendErrorResponse(res, "Error", "Invalid login/password")
        }
        if (email === result.rows[0].email) {
            req.session.user = { email }
            console.log('email',email , 'req.session.user', req.session.user);
            
            return res.json({ "resPath": "/home", "auth": true })
        }
        sendErrorResponse(res, "Error", "Invalid login/password")
    })
})



module.exports = router