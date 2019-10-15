import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import '../css/results.css'
import Recommendations from './recommendation'
import MapView from './map/mapView'
import * as env from '../env'
import axios from 'axios';

const Results = (props) => {

    const [component, setComponent] = useState('recommendations')

    // const triage = {
    //     tPA: {
    //         ageInRange: true,
    //         lastKnownWell: "12:45:00",
    //         timeSinceLKW: 3.2,
    //         recentSurgery: false,
    //         pregnancy: false,
    //         anticoagulants: false
    //     },
    //     race: {
    //         facialPalsy: 1,
    //         armMotorImpairment: 1,
    //         legMotorImpairment: 2,
    //         gazeDeviation: 2,
    //         hemiparesis: true,
    //         hemiparesisSide: 'left',
    //         agnosia: 2,
    //         aphasia: null
    //     }
    // }

    // const results = {
    //     race: 6,
    //     lvo: true,
    //     tpa: true
    // }

    const [error, setError] = useState("")

    const [patient, setPatient] = useState({
        ready: false,
        sent: false,
        triage: {
            tPA: props.location.state.tpa,
            race: props.location.state.race
        },
        results: {},
        rec: {}
    })

    const setResults = results => {
        setPatient({
            ...patient,
            results: results
        })
    }

    const sendToHospital = async (hospitalId, hospitals, location) => {

        setPatient({
            ...patient,
            rec: {
                userLocation: {
                    lng: location.lng,
                    lat: location.lat
                },
                hospitalId: hospitalId,
                recHospitals: hospitals.map(hospital => hospital._id)
            },
            ready: true
        })
    }

    const postPatient = async () => {
        console.log(patient)
        let response = await axios.post(`${env.serverUrl}/patient/ems`, {patient: patient})
        if (response.data.success) {
            setPatient({
                ...patient,
                sent: true
            })
        } else if (response.data.error) {
            setError(response.data.error)
        }
    }


    const renderComponent = () => {
        switch(component) {
            case 'recommendations':
                return (
                    <Recommendations
                        triage={patient.triage}
                        results={patient.results}
                        setResults={setResults}
                        switchView={() => setComponent('maps')} 
                    />
                )
            case 'maps':
                return (
                    <MapView
                        lvo={patient.results.lvo}
                        switchView={() => setComponent('recommendations')}
                        sendToHospital={sendToHospital}
                        patient={patient}
                    />
                )
        }
    }

    if (patient.ready && !patient.sent) {
        postPatient()
    }

    return (
        <React.Fragment>
            {renderComponent()}
        </React.Fragment>
    )
}

export default connect()(Results)