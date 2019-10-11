const express = require('express')
const router = express.Router()

const authenticate = require('../middleware/authMiddleware')
// router.use('/ems', authenticate.ems)
// router.use('/ed', authenticate.ed)

const Patient = require('../models/patient')


router.post('/ems', (req,res) => {
    let {triage, rec, results} = req.body.patient
    let patient = {
        ems: {
            tpa: triage.tPA,
            race: {
                ...triage.race,
                score: results.race
            }
        },
        rec: {
                diversion: results.lvo,
                userLoc: rec.userLocation,
                hospitalId: rec.hospitalId,
                recList: rec.recHospitals
        }
    }
    Patient.create(patient, (error, patient) => error ? res.json({error: "Could not send patient"}) : res.json({success: true, patient: patient}))
})

router.get('/ed', (req,res) => {
    res.json({message: 'ed post route'})
})

router.patch('/ed', (req,res) => {
    res.json({message: 'ed patch route'})
})


module.exports = router