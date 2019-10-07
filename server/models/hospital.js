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
    CSC: Boolean,
    EVMT: Boolean,
    PSC: Boolean,
    TPA: Boolean,
    TSC: Boolean
})

const Hospital = mongoose.model('Hospital', hospitalSchema)

module.exports = {Hospital, Coords}