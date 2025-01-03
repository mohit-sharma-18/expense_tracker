const express = require('express')
const db = require('./db.js')
const app = express()
const signUp = require('./components/apis/signup.js')
const login = require('./components/apis/login.js')
const addExpense = require('./components/apis/addExpense.js')
require('dotenv').config()
const cors = require('cors')
const port = 5000
const session = require('express-session')

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use(
    session({
        secret: process.env.secret_key,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);
app.use('/signup', signUp)
app.use('/login', login)
app.use('/addExpense', addExpense)

app.get('/connection', async (req, res) => {
    try {
        const result = await db.query(`select * FROM admindata.USERS`)
        res.send(result.rows)
    }
    catch (err) {
        console.log(`Error occured ${err}`)
        res.status(500).send('Database Error')
    }
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})