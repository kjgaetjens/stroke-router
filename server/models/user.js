const mongoose = require('mongoose')

const emsUserSchema = new mongoose.Schema({
    username: String,
    password: String,
    emsAffiliation: String
})

const EMSUser = mongoose.model('EMSUser', emsUserSchema)



const edUserSchema = new mongoose.Schema({
    username: String,
    password: String,
    hopitalAffiliation: String
})

const EDUser = mongoose.model('EDUser', edUserSchema)

module.exports = {
    EMSUser: EMSUser,
    EDUser: EDUser
}