const express = require('express')
const router = express.Router()
const db = require('../../db')
const sendErrorResponse = require('./toastResponse')

router.use(express.json())

router.post('/', (req, res) => {
    const { amount, description, expenseType } = req.body
    if (!req.session.user) {
        return sendErrorResponse(res, 'Error', "Login First")
    }
    const { email } = req.session.user;
    const username = 'not specified'
    db.query('select username from admindata.users where email = $1', [email], (err, result) => {
        const fetchedUserName = result.rows.length > 0 ? result.rows[0].username : username
        db.query('INSERT INTO ADMINDATA.EXPENSE_SUMMARY(EMAIL,EXPENSE_TYPE,DESCRIPTION,AMOUNT,USERNAME) VALUES($1,$2,$3,$4::bigint,$5)',
            [email, expenseType, description, amount, fetchedUserName], (err, result) => {
                if (err) {
                    console.log(err);
                    return sendErrorResponse(res, 'Error', "Internal Server Error")
                }
                return sendErrorResponse(res.status(200), 'Success', "Expense added successfully")
            })
    })
})

module.exports = router