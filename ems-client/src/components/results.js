import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import Recommendations from './recommendation'
import Maps from './maps'

const Results = (props) => {

    const [component, setComponent] = useState('recommendations')

    const triage = {
        tPA: {
            ageInRange: true,
            timeSinceLKW: 3.2,
            anticoags: false,
            LKW: "12:45:00",
            pregnancy: false,
            recentSurgery: false

        },
        race: {
            facialPalsy: 1,
            armMotor: 1,
            legMotor: 2,
            gazeDev: 1,
            hemiparesis: "left",
            agnosia: 1,
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
                    <Maps
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