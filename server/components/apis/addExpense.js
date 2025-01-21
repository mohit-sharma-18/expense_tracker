const express = require('express')
const router = express.Router()
const db = require('../../db')
const sendErrorResponse = require('./toastResponse')

router.use(express.json())

router.get('/', (req, res) => {
    const editID = req.query.editID
    // const user = req.session.user
    db.query(`SELECT amount as amount,expense_type as expenseType,description as description , icon
        from admindata.expense_summary where id = $1`, [editID], (err, result) => {
        if (err) {
            console.log(err);
            sendErrorResponse(res, 'Error', "Error while fetching data!")
        }
        if (result.rows.length > 0) {
            console.log('result--', result.rows);
            return res.send(result.rows)
        }
        return sendErrorResponse(res, 'Warning', 'No data found')
    })
})

router.put('/', (req, res) => {
    const { amount, description, expenseType, icon } = req.body
    const editID = req.query.editID
    db.query(`UPDATE ADMINDATA.EXPENSE_SUMMARY
        SET AMOUNT = $1, DESCRIPTION = $2, EXPENSE_TYPE = $3, ICON = $4
        where id= $5`, [amount, description, expenseType, icon, editID], (err, result) => {
        if (err) {
            console.log('Error while updating data ' + err)
            return sendErrorResponse(res, 'Error', "Error while updating data!")
        }
        return sendErrorResponse(res.status(200), 'Success', "Updated successfully.")
    })
})

router.post('/', (req, res) => {
    const { amount, description, expenseType, icon } = req.body
    if (!req.session.user) {
        return sendErrorResponse(res, 'Error', "Login First")
    }
    const { email } = req.session.user;
    const username = 'not specified'
    db.query('select username from admindata.users where email = $1', [email], (err, result) => {
        const fetchedUserName = result.rows.length > 0 ? result.rows[0].username : username
        db.query('INSERT INTO ADMINDATA.EXPENSE_SUMMARY(EMAIL,EXPENSE_TYPE,DESCRIPTION,AMOUNT,USERNAME,ICON) VALUES($1,$2,$3,$4::bigint,$5,$6)',
            [email, expenseType, description, amount, fetchedUserName, icon], (err, result) => {
                if (err) {
                    console.log(err);
                    return sendErrorResponse(res, 'Error', "Internal Server Error")
                }
                return sendErrorResponse(res.status(200), 'Success', "Expense added successfully")
            })
    })
})

router.delete('/', (req, res) => {
    const deleteID = req.query.deleteID
    db.query(`DELETE FROM ADMINDATA.EXPENSE_SUMMARY
        where id= $1`, [deleteID], (err, result) => {
        if (err) {
            console.log('Error while updating data ' + err)
            return sendErrorResponse(res, 'Error', "Error while deleting data!")
        }
        return sendErrorResponse(res.status(200), 'Success', "Deleted successfully")
    })
})

module.exports = router