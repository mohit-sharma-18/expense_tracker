const express = require('express')
const db = require('./db.js')
const app = express()
const signUp = require('./components/apis/signup.js')
const login = require('./components/apis/login.js')
const addExpense = require('./components/apis/addExpense.js')
const home = require('./components/apis/home.js')
const userProfile = require('./components/apis/userProfile.js')
const logout = require('./components/apis/logout.js')
require('dotenv').config()
const cors = require('cors')
const port = 5000
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db.js')
const cookieParser = require('cookie-parser');


app.use(express.json())
app.use(cors({
    origin: process.env.db_frontend,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))
app.use(cookieParser())
app.use('/signup', signUp)
app.use('/login', login)
app.use('/addExpense', addExpense)
app.use('/home', home)
app.use('/userProfile', userProfile)
app.use('/logout', logout)

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