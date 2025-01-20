const express = require('express')
const router = express.Router()
const db = require('../../db')
const app = express()

// router.post('/logout', (req, res) => {

// })
router.post('/', (req, res) => {
    req.session.destroy((err) => {
        console.log('session destroyed');
        return res.json({ "resPath": "/login", "auth": false })
    })
})

module.exports = router