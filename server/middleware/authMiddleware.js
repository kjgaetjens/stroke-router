const jwt = require('jsonwebtoken')
const userModels = require('../models/user')


const emsAuth = (req,res,next) => {
    console.log('ems middleware called...')
    console.log(req.headers)
    let headers = req.headers['authorization']

    if (headers) {
        const token = headers.split(' ')[1]
        var decoded = jwt.verify(token, process.env.PRIVATE_KEY)
        if (decoded) {
            const username = decoded.username
            userModels.EMSUser.findOne({username: req.body.username}, (error, user) => user ? next() : res.json({error: 'Invalid Credentials'}))
        } else {
            res.json({error: 'Unauthorized Access'})
        }
    } else {
        res.json({error: 'Authorization header not found'})
    }
}


const edAuth = (req,res,next) => {
    console.log('ed middleware called...')
    let headers = req.headers['authorization']

    if (headers) {
        const token = headers.split(' ')[1]
        var decoded = jwt.verify(token, process.env.PRIVATE_KEY)
        if (decoded) {
            const username = decoded.username
            userModels.EDUser.findOne({username: req.body.username}, (error, user) => user ? next() : res.json({error: 'Invalid Credentials'}))
        } else {
            res.json({error: 'Unauthorized Access'})
        }
    } else {
        res.json({error: 'Authorization header not found'})
    }
}

module.exports = {
    ems: emsAuth,
    ed: edAuth
}