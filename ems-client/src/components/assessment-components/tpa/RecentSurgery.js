import React,{useState} from 'react';

function RecentSurgery(props) {

    const [infoBox, setInfoBox] = useState(false)

    const displayInfo = () => {
        infoBox ? setInfoBox(false) : setInfoBox(true)
    }

    const createInfoBox = () => {
        return (
            <div className="info-text">
                this is help text for this question. boiler plate boiler plate boiler plate boiler plate boiler plate boiler plate
            </div>
        )
    }

    const submitAnswer = (answer) => {
        props.setAnswer('recentSurgery', answer)
        props.nextQuestion('Pregnancy')
    }


    return (
        <React.Fragment>
        <div className="assessment-header">
            <button onClick={() => props.prevQuestion('LastKnownWell')}>{`< Back`}</button>
            <h4>tPA Exclusion Assessment</h4>
            <div className="progress-border">
                <div className="progress-fill"></div>
            </div>
        </div>

        <div className="assessment-container">
            <div className="question-container">
                <span className="question-text">Has the patient had surgery in the last 3 months? <i className="fas fa-info-circle" onClick={() => displayInfo()}></i></span><span className="info-icon-span"></span>
                {infoBox ? createInfoBox() : null}
            </div>
            <div className="answer-container">
                <button onClick={() => submitAnswer(true)}>Yes</button>
                <button onClick={() => submitAnswer(false)}>No</button>
                <button onClick={() => props.nextQuestion('Pregnancy')}>Unknown</button>
            </div>
        </div>
        </React.Fragment>
    );

}

export default RecentSurgery;
