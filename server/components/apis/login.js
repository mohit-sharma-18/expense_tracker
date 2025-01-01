const express = require('express')
const router = express.Router()
const db = require('../../db')
router.use(express.json())

router.post('/', (req, res) => {
    console.log('req', req.body);
    const { email, password } = req.body
    db.query('select * from admindata.users where email = $1 AND password = $2', [email, password], (err, result) => {
        if (err) {
            console.log('Error while fetching data ' + err);
            return sendErrorResponse(res, "An error occured while fetching data !")
        }
        if (result.rows.length == 0) {
            return sendErrorResponse(res, "Invalid login/password")
        }
        if (email === result.rows[0].email) {
            return res.json({ "resPath": "/home", "auth": true })
        }
        sendErrorResponse(res, "Invalid login/password")
    })
})

const sendErrorResponse = (res, msg) => {
    res.json({
        "toastHeader": "Error",
        "toastMsg": msg,
        "toastColor": "red",
        "toastIcon": "fa-close",
        "auth": false
    })
}

module.exports = router