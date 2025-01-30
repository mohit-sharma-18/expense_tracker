const express = require('express')
const router = express.Router()
const db = require('../../db')
const sendErrorResponse = require('./toastResponse')
const authToken = require('../../common/authentication')
router.use(express.json())

router.get('/', authToken, (req, res) => {
    const { email } = req.user;
    const dateTime = req.query.date ?? 'todayDate'
    console.log('req.user', req.user);

    db.query(`with temp_data as(
                    select id::text as id, INITCAP(expense_type) as expense_type ,description,amount ,icon
                    from admindata.expense_summary 
                    where email = $1
                    AND
                    (
                    CASE WHEN $2 ='todayDate' THEN CREATED_AT >= CURRENT_DATE
                     WHEN $2 ='last7Days' THEN CREATED_AT >= CURRENT_DATE - INTERVAL '7 days'
                     WHEN $2 ='last30Days' THEN CREATED_AT >= CURRENT_DATE - INTERVAL '30 days'
                    else true
                    end
                    )
                    order by created_at desc
                ),
            temp_total as(
                    select ' ' as id,'Total' as expense_type, ' ' as description, sum(amount) as amount ,' ' as icon
                    from admindata.expense_summary
                    where email = $1
                     AND
                    (
                    CASE WHEN $2 ='todayDate' THEN CREATED_AT >= CURRENT_DATE
                     WHEN $2 ='last7Days' THEN CREATED_AT >= CURRENT_DATE - INTERVAL '7 days'
                     WHEN $2 ='last30Days' THEN CREATED_AT >= CURRENT_DATE - INTERVAL '30 days'
                    else true
                    end
                    )
                )
                select * from temp_data
                union all
                select * from temp_total
                where exists(select 1 from admindata.expense_summary where  (
                    CASE WHEN $2 ='todayDate' THEN CREATED_AT >= CURRENT_DATE
                     WHEN $2 ='last7Days' THEN CREATED_AT >= CURRENT_DATE - INTERVAL '7 days'
                     WHEN $2 ='last30Days' THEN CREATED_AT >= CURRENT_DATE - INTERVAL '30 days'
                    else true
                    end
                    )
                    AND email=$1)`, [email, dateTime], (err, result) => {
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