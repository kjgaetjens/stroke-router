const mongoose = require('mongoose')
require('mongoose-double')(mongoose)

var SchemaTypes = mongoose.Schema.Types

/*currently storing values as boolean; however a user may select "unknown" on the client side. in such cases, the property will not be added or have a null value. when determining recommendations on the server side, we will typically evaluate a null value the same way as a value of false.*/

/* patient schema (parent) */
const patientSchema = new mongoose.Schema({
    timestamps: true, //is this right?
    ems: emsSchema,
    ed: edSchema,
    rec: recSchema
})
const Patient = mongoose.model('Patient', patientSchema)


/* ems and nested schemas */
const emsSchema = new mongoose.Schema({
    tpa: tpaSchema,
    race: raceSchema
})
const EMS = mongoose.model('EMS', emsSchema)

const tpaSchema = new mongoose.Schema({
    ageInRange: Boolean,
    lkw: String,
    timeSinceLkw: String,
    recSurgery: Boolean,
    pregnancy: Boolean,
    anticoagulants: Boolean
})
const TPA = mongoose.model('TPA', tpaSchema)

const raceSchema = new mongoose.Schema({
    facialPalsy: Number,
    armMotorImpairment: Number,
    legMotorImpairment: Number,
    gazeDeviation: Number,
    hemiparesis: Boolean,
    hemiparesisSide: String,
    agnosia: Number,
    aphasia: Number,
    score: Number
})
const Race = mongoose.model('Race', raceSchema)

/* ed and nested schemas */
const edSchema = new mongoose.Schema({
    hospitalId: Number,
    lkw: String, // might have to create our own date object or store as string and do the conversion on the app.js side?
    doorTime: String, // might have to create our own date object or store as string and do the conversion on the app.js side?
    ctTime: String, // might have to create our own date object or store as string and do the conversion on the app.js side?
    needleTime: String, // might have to create our own date object or store as string and do the conversion on the app.js side?
    neuroTime: String, // might have to create our own date object or store as string and do the conversion on the app.js side?
    nihss: Number,
    lvo: Boolean,
    Surgery: Boolean
})
const ED = mongoose.model('ED', edSchema)


/* diversion rec and nested schemas */
const recSchema = new mongoose.Schema({
    diversion: Boolean,
    recList: [recListSchema]
})
const Rec = mongoose.model('Rec'. recSchema)


const recListSchema = new mongoose.Schema({
    hospitalId: Number,
    meetsCrit: Boolean,
    distance: SchemaTypes.Double, //might have done this wrong
    minutes: Number
})
const RecList = mongoose.model('RecList', recListSchema)



module.exports = {Patient, EMS, TPA, Race, ED, Rec, RecList}