const express = require('express')
const router = express.Router()

var mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const saltRounds = 10

const jwt = require('jsonwebtoken')

// register new user
router.post('/register', (req,res) => {
    let username = req.body.username
    let password = req.body.password

    bcrypt.hash(password, saltRounds, (error, hash) => {
        if (error) {
            res.json({error: error})
        } else {
            // find user in DB
        }
    })
})

module.exports = router