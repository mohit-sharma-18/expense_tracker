const express = require('express')
const router = express.Router()
const db = require('../../db')
const sendErrorResponse = require('./toastResponse')
const authToken = require('../../common/authentication')

router.get('/', authToken, (req, res) => {
    const { user } = req.user
    return res.json({ "username": user })
})

module.exports = router