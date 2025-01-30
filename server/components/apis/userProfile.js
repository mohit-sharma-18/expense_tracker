const express = require('express')
const router = express.Router()
const db = require('../../db')
const sendErrorResponse = require('./toastResponse')
const authToken = require('../../common/authentication')

router.get('/', authToken, (req, res) => {
    const { email } = req.user
    db.query('SELECT USERNAME FROM ADMINDATA.USERS WHERE upper(EMAIL) = upper($1)', [email], (err, result) => {
        if (err) {
            console.log('Error while fetching data ' + err);
            return sendErrorResponse(res, "Error", "An error occured while fetching data !")
        }
        if (result.rows.length > 0)
            return res.send(result.rows)
    })
})

module.exports = router