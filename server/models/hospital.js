const mongoose = require('mongoose')


const locSchema = new mongoose.Schema({
    type: String,
    coordinates: [Number]
})

const Loc = mongoose.model('Loc', locSchema)

const hospitalSchema = new mongoose.Schema({
    name: String,
    address: String,
    loc: locSchema,
    CSC: String,
    EVMT: String,
    PSC: String,
    TPA: String,
    TSC: String
})

const Hospital = mongoose.model('Hospital', hospitalSchema)

module.exports = {Hospital, Loc}


