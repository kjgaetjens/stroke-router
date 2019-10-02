import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

const Recommendations = (props) => {

    const [raceScore, setRaceScore] = useState(0)


    const recommendationText = {
        both: 'Patient is highly likely (> 85%) to have a Large Vessel Occlusion, but also may be a candidate for tPA. It is recommended to transport patient directly to a Thrombectomy-Capable Stroke Center, unless this doing so will substantially increase travel time.',
        lvo: 'Patient is highly likely (> 85%) to have a Large Vessel Occlusion, and is also not a candidate for tPA. It is recommended to transport patient directly to a Thrombectomy-Capable Stroke Center for further treatment.',
        tpa: 'Patient is below the threshold indicating a high chance of Large Vessel Occlusion, but may be a candidate for tPA. It is recommended to transport patient to the closest Stroke Center',
        neither: 'Patient is below the threshold indicating a high chance of Large Vessel Occlusion. It is recommended to transport patient to the closest Stroke Center'
    }

    const displayRecommendation = () => {
        if (props.results.lvo && !props.results.tpa) {
            return recommendationText.lvo
        } else if (props.results.lvo && props.results.tpa) {
            return recommendationText.lvo
        } else if (!props.results.lvo && !props.results.tpa) {
            return recommendationText.neither
        } else if (!props.results.lvo && props.results.tpa) {
            return recommendationText.tpa
        }
    }

    const calcRaceScore = () => {

        let score = 0

        Object.keys(props.triage.race).forEach(criteria => {
            if (criteria === "hemiparesis" || props.triage.race[criteria] === null) {
                return
            } else {
                score += (props.triage.race[criteria])
            }
        })

        let tpaCriteria = props.triage.tPA
        
        props.setResults({
            race: score,
            lvo: score >= 5 ? true : false,
            tpa: tpaCriteria.ageInRange && !tpaCriteria.anticoags && !tpaCriteria.pregnancy && !tpaCriteria.recentSurgery && tpaCriteria.timeSinceLKW <= 4.5 ? true : false
        })
        
    }



    useEffect(() => {
        calcRaceScore()
    }, [])


    return (
        <div className="pageComponent">
            <span className="score">{props.results.race}</span>
            <span className="recommendationText">{displayRecommendation()}</span>
            <button className="submitButton" onClick={props.switchView}>Show Nearby Centers</button>
        </div>
    )
}

export default Recommendations