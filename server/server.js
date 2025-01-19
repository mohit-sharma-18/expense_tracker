const express = require('express')
const db = require('./db.js')
const app = express()
const signUp = require('./components/apis/signup.js')
const login = require('./components/apis/login.js')
const addExpense = require('./components/apis/addExpense.js')
const home = require('./components/apis/home.js')
const userProfile = require('./components/apis/userProfile.js')
require('dotenv').config()
const cors = require('cors')
const port = 5000
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db.js')

app.use(express.json())
app.use(cors({
    origin: process.env.db_frontend,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))
app.use(
    session({
        store: new pgSession({
            pool: pool,
            tableName: 'session',
            createTableIfMissing: true,
        }),
        secret: process.env.secret_key,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.node_env === 'production',
            httpOnly: true,
            maxAge: 3600000,
            sameSite: process.env.node_env === 'production' ? 'none' : 'lax'
        }
    })
);
app.set('trust proxy', 1)
app.use('/signup', signUp)
app.use('/login', login)
app.use('/addExpense', addExpense)
app.use('/home', home)
app.use('/userProfile', userProfile)

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