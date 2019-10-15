import React,{useState} from 'react';

function LastKnownWell(props) {

    const [lkwTime, setLkwTime] = useState('')
    const [infoBox, setInfoBox] = useState(false)

    
    const displayInfo = () => {
        infoBox ? setInfoBox(false) : setInfoBox(true)
    }

    const createInfoBox = () => {
        return (
            <div className="info-text">
                Last time the patient was seen without stroke-like symptoms, at baseline level of health.
            </div>
        )
    }

    const handleAnswer = (e) => {

        setLkwTime(e.target.value)

    }

    const submitAnswer = () => {

        const currentDateTime = new Date()
        const currentHour = currentDateTime.getHours()
        const currentMinute = currentDateTime.getMinutes()
        const lkwHour = parseInt(lkwTime[0]+lkwTime[1])
        const lkwMinute = parseInt(lkwTime[4]+lkwTime[5])

        const generateLkwDateTimeString = () => {
            let lkwDateTimeString
            //determine if lkw date is current date or previous date
            if (lkwHour < currentHour || (lkwHour === currentHour && lkwMinute < currentMinute)) {
                let currentDateString = (currentDateTime.toISOString()).slice(0,11)
                lkwDateTimeString = `${currentDateString}${lkwTime}.000Z`
            } else {
                let yesterdayDateTime = new Date()
                yesterdayDateTime.setDate(currentDateTime.getDate() - 1)
                let yesterdayDateString = (yesterdayDateTime.toISOString()).slice(0,11)
                lkwDateTimeString = `${yesterdayDateString}${lkwTime}.000Z`
            }
            return lkwDateTimeString
        }

        const lkwDateTimeString = generateLkwDateTimeString()


        props.setAnswer('lastKnownWell', lkwDateTimeString)
        props.nextQuestion('RecentSurgery')

    }

    const submitNullAnswer = () => {

        props.setAnswer('lastKnownWell', null)
        props.nextQuestion('RecentSurgery')

    }

    return (
        <React.Fragment>
        <div className="assessment-header">
            <a onClick={() => {props.prevQuestion('AgeInRange')}}>{`< Back`}</a>
            <h4>tPA Exclusion Assessment</h4>
            <div className="progress-border">
                <div className="progress-fill"></div>
            </div>
        </div>

        <div className="assessment-container">
            <div className="question-container">
                <span className="question-text">What is the last time the patient was seen well? <i className="fas fa-info-circle" onClick={() => displayInfo()}></i></span>
                {infoBox ? createInfoBox() : null}
            </div>
            <div className="answer-container">
                <input type="time" name="lkw-time" onChange={(e) => handleAnswer(e)}></input>
                {lkwTime == '' ? <button id="disabled-button">Submit</button> : <button onClick={() => submitAnswer()}>Submit</button>}
                <button onClick={() => submitNullAnswer()}>More than 24 hours ago</button>
                <button onClick={() => submitNullAnswer()}>Unknown</button>
            </div>
        </div>
        </React.Fragment>
    );

}

export default LastKnownWell;
