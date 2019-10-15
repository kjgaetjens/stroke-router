import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

const Recommendations = (props) => {

    const recommendationText = {
        both: 'Patient is highly likely (> 85%) to have a Large Vessel Occlusion, but also may be a candidate for tPA. It is recommended to transport patient directly to a Thrombectomy-Capable Stroke Center, unless doing so will substantially increase travel time.',
        lvo: 'Patient is highly likely (> 85%) to have a Large Vessel Occlusion, and is also not a candidate for tPA. It is recommended to transport patient directly to a Thrombectomy-Capable Stroke Center for further treatment.',
        tpa: 'Patient is below the threshold indicating a high chance of Large Vessel Occlusion, but may be a candidate for tPA. It is recommended to transport patient to the closest Stroke Center',
        neither: 'Patient is below the threshold indicating a high chance of Large Vessel Occlusion. It is recommended to transport patient to the closest Stroke Center',
        none: 'Patient has no symptoms recognized by the RACE scale.'
    }

    const displayRecommendation = () => {
        if (props.results.race === 0) {
            return recommendationText.none
        } else if (props.results.lvo && !props.results.tpa) {
            return recommendationText.lvo
        } else if (props.results.lvo && props.results.tpa) {
            return recommendationText.both
        } else if (!props.results.lvo && !props.results.tpa) {
            return recommendationText.neither
        } else if (!props.results.lvo && props.results.tpa) {
            return recommendationText.tpa
        }
    }

    const calcRaceScore = () => {
        console.log(props.triage.race)
        let score = 0
        Object.keys(props.triage.race).forEach(criteria => {
            if (criteria === "hemiparesis" || criteria === "hemiparesisSide" || criteria === "ready" ||props.triage.race[criteria] === null) {
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

    const scoreColor = () => {
        switch(props.results.race) {
            case 1:
                return {"color": "#badc58"}
            case 2:
                return {"color": "#f1c40f"}
            case 3:
                return {"color": "#f1c40f"}
            case 4:
                return {"color": "#f39c12"}
            case 5:
                return {"color": "#d35400"}
            case 6:
                return {"color": "#d35400"}
            case 7:
                return {"color": "#e74c3c"}
            case 8:
                return {"color": "#e84118"}
            case 9:
                return {"color": "#c23616"}
            default:
                return {"color": "#2ecc71"}
        }
    }


    useEffect(() => {
        calcRaceScore()
    }, [])


    return (
        <div className="recommendation-div">
            <div className="pageComponent">
                <div className="scoreDiv">
                    <span className="score" style={scoreColor()}>{props.results.race}</span>
                    <p className="recommendationText">{displayRecommendation()}</p>
                </div>
                <div>
                    <button className="submitButton" onClick={props.switchView}>Show Nearby Centers</button>
                </div>
            </div>
        </div>

    )
}

export default Recommendations