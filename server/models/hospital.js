const mongoose = require('mongoose')

const coordsSchema = new mongoose.Schema({
    lat: Number,
    lng: Number
})

const Coords = mongoose.model('Coords', coordsSchema)

const hospitalSchema = new mongoose.Schema({
    name: String,
    address: String,
    coords: coordsSchema,
    CSC: String,
    EVMT: String,
    PSC: String,
    TPA: String,
    TSC: String
})

const Hospital = mongoose.model('Hospital', hospitalSchema)

module.exports = {Hospital, Coords}