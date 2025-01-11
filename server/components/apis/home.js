const express = require('express')
const router = express.Router()
const db = require('../../db')
const sendErrorResponse = require('./toastResponse')

router.use(express.json())

router.get('/', (req, res) => {
    if (!req.session.user) {
        return sendErrorResponse(res, 'Error', "Login First")
    }
    const { email } = req.session.user;
    db.query(`with temp_data as(
                    select INITCAP(expense_type) as expense_type ,description,amount ,icon
                    from admindata.expense_summary 
                    where email = $1
                    order by created_at desc
                ),
            temp_total as(
                    select 'Total' as expense_type, ' ' as description, sum(amount) as amount ,' ' as icon
                    from admindata.expense_summary
                    where email = $1
                )
                select * from temp_data
                union all
                select * from temp_total
                where exists(select 1 from admindata.expense_summary)`, [email], (err, result) => {
        console.log('result', result.rows);
        if (err) {
            console.log('error while fetching data' + err);
            sendErrorResponse(res, 'Error', "Error while fetching data!")
        }
        if (result.rows.length > 0) {
            return res.send(result.rows)
        }
        return sendErrorResponse(res.status(200), 'Warning', 'No data found')
    })
})

module.exports = router