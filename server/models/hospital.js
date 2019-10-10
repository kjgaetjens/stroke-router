const mongoose = require('mongoose')

const coordsSchema = new mongoose.Schema({
    lat: Number,
    lng: Number
})

const Coords = mongoose.model('Coords', coordsSchema)

const locSchema = new mongoose.Schema({
    type: String,
    coordinates: coordsSchema
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

module.exports = {Hospital, Loc, Coords}


