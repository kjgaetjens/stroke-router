const mongoose = require('mongoose')
require('mongoose-double')(mongoose)

var SchemaTypes = mongoose.Schema.Types

/*currently storing values as boolean; however a user may select "unknown" on the client side. in such cases, the property will not be added or have a null value. when determining recommendations on the server side, we will typically evaluate a null value the same way as a value of false.*/

const locationSchema = new mongoose.Schema({
    lng: Number,
    lat: Number
})

const recSchema = new mongoose.Schema({
    diversion: Boolean,
    userLoc: locationSchema,
    hospitalId: String,
    recList: [String]
})

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

const tpaSchema = new mongoose.Schema({
    ageInRange: Boolean,
    lastKnownWell: String,
    timeSinceLKW: Number,
    recentSurgery: Boolean,
    pregnancy: Boolean,
    anticoagulants: Boolean
})

const emsSchema = new mongoose.Schema({
    tpa: tpaSchema,
    race: raceSchema
})

const patientSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now }, //is this right?
    ems: emsSchema,
    // ed: edSchema,
    rec: recSchema
})
const Patient = mongoose.model('Patient', patientSchema)



// const TPA = mongoose.model('TPA', tpaSchema)


// const Race = mongoose.model('Race', raceSchema)

// /* ed and nested schemas */
// const edSchema = new mongoose.Schema({
//     hospitalId: Number,
//     lkw: String, // might have to create our own date object or store as string and do the conversion on the app.js side?
//     doorTime: String, // might have to create our own date object or store as string and do the conversion on the app.js side?
//     ctTime: String, // might have to create our own date object or store as string and do the conversion on the app.js side?
//     needleTime: String, // might have to create our own date object or store as string and do the conversion on the app.js side?
//     neuroTime: String, // might have to create our own date object or store as string and do the conversion on the app.js side?
//     nihss: Number,
//     lvo: Boolean,
//     Surgery: Boolean
// })
// const ED = mongoose.model('ED', edSchema)


/* diversion rec and nested schemas */

// const Rec = mongoose.model('Rec'. recSchema)



// const RecList = mongoose.model('RecList', recListSchema)



module.exports = Patient