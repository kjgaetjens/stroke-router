const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authMiddleware')
// router.use('/ems', authenticate.ems)
// router.use('/ed', authenticate.ed)

router.post('/ems', (req,res) => {
    res.json({message: 'ems post route'})
})

router.post('/ed', (req,res) => {
    res.json({message: 'ed post route'})
})

router.patch('/ed', (req,res) => {
    res.json({message: 'ed patch route'})
})

module.exports = router