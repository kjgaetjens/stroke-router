import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import '../css/results.css'
import Recommendations from './recommendation'
import MapView from './map/mapView'

const Results = (props) => {

    const [component, setComponent] = useState('maps')

    // const triage = {
    //     tPA: props.location.state.tpa,
    //     race: props.location.state.tpa
    // }

    const triage = {
        tPA: {
            ageUnder80: true,
            ageOver18: true,
            ageInRange: true,
            lastKnownWell: "12:45:00",
            timeSinceLKW: 3.2,
            recentSurgery: false,
            pregnancy: false,
            anticoagulants: false
        },
        race: {
            facialPalsy: 1,
            armMotorImpairment: 1,
            legMotorImpairment: 2,
            gazeDeviation: 2,
            hemiparesis: "left",
            agnosia: 2,
            aphasia: null
        }
    }

    const [results, setResults] = useState({
        race: null,
        lvo: null,
        tpa: null
    })




    const renderComponent = () => {
        switch(component) {
            case 'recommendations':
                return (
                    <Recommendations
                        triage={triage}
                        results={results}
                        setResults={setResults}
                        switchView={() => setComponent('maps')} 
                    />
                )
            case 'maps':
                return (
                    <MapView
                        lvo={results.lvo}
                        switchView={() => setComponent('recommendations')}
                    />
                )
        }
    }

    return (
        <React.Fragment>
            {renderComponent()}
        </React.Fragment>
    )
}

export default connect()(Results)