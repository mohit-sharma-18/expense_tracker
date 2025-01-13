const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    user: process.env.db_username,
    password: process.env.db_pass,
    host: process.env.db_host,
    database: process.env.db_database,
    port: process.env.db_port,
    ssl: {
        rejectUnauthorized: false 
    }
})


pool.connect((err, client, release) => {
    if (err) {
        console.log(`DB connection error ${err.stack}`)
    }
    else {
        console.log('Database connected successfully');
        release()
    }
})
module.exports = pool