const express = require('express')
const router = express.Router()
const db = require('../../db')
const sendErrorResponse = require('./toastResponse')

router.get('/', (req, res) => {
    const { email } = req.session.user
    db.query('SELECT USERNAME FROM ADMINDATA.USERS WHERE EMAIL = $1', [email], (err, result) => {
        if (err) {
            console.log('Error while fetching data ' + err);
            return sendErrorResponse(res, "Error", "An error occured while fetching data !")
        }
        if (result.rows.length > 0)
            return res.send(result.rows)
    })
})

module.exports = router