const express = require('express')
const router = express.Router()

const userModels = require('../models/user')

const bcrypt = require('bcrypt')
const saltRounds = 10

const jwt = require('jsonwebtoken')

// register new user
router.post('/register', (req,res) => {
    console.log('register')

    let newUser = {
        username: req.body.username,
        password: req.body.password,
        emsAffiliation: req.body.emsAffiliation
    }

    userModels.EMSUser.findOne({username: newUser.username}, (error, existingUser) => {
        if (error) {
            res.json({error: error})
        }
        if (existingUser) {
            res.json({error: "Username taken"})
        } else {
            bcrypt.hash(newUser.password, saltRounds, (error, hash) => {
                if (error) {
                    res.json({error: "Could not encrypt password. Password not saved"})
                } else {

                    newUser.password = hash
                    const token = jwt.sign({username: newUser.username}, process.env.PRIVATE_KEY)

                    userModels.EMSUser.create(newUser, (error, user) => error ? res.json({error: "Could not register user"}) : res.json({success: true, token: token, userId: user._id}))
                }
            })
        }
    })
})

router.post('/login', (req, res) => {
    console.log('login')
    userModels.EMSUser.findOne({username: req.body.username}, (error, user) => {
        if (user) {
            let token = jwt.sign({username: req.body.username}, process.env.PRIVATE_KEY)
            bcrypt.compare(req.body.password, user.password, (error, result) => result ? res.json({success: true, token: token, userId: user._id}) : res.json({error: "Incorrect password"}))
        } else if (error) {
            res.json({error: "User does not exist"})
        }
    })
})

module.exports = router