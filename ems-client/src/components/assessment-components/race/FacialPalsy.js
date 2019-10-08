import React,{useState} from 'react';

function FacialPalsy(props) {

    const [infoBox, setInfoBox] = useState(false)

    const displayInfo = () => {
        infoBox ? setInfoBox(false) : setInfoBox(true)
    }

    const createInfoBox = () => {
        return (
            <div className="info-text">
                Ask the patient to smile or show their teeth, and note if one side of their face responds less - or doesn't respond at all
            </div>
        )
    }

    const submitAnswer = (answer) => {
        props.setAnswer('facialPalsy', answer)
        props.nextQuestion('ArmMotorImpairment')
    }

    return (
        <React.Fragment>
        <div className="assessment-header">
            <button onClick={() => props.prevQuestion('Anticoagulants')}>{`< Back`}</button>
            <h4>RACE Assessment</h4>
            <div className="progress-border">
                <div className="progress-fill"></div>
            </div>
        </div>

        <div className="assessment-container">
            <div className="question-container">
                <span className="question-text">Is the patient experiencing facial palsy? <i className="fas fa-info-circle" onClick={() => displayInfo()}></i></span>
                {infoBox ? createInfoBox() : null}
            </div>
            <div className="answer-container">
                <button onClick={() => submitAnswer(0)}>Absent</button>
                <button onClick={() => submitAnswer(1)}>Mild</button>
                <button onClick={() => submitAnswer(2)}>Moderate to Severe</button>
            </div>
        </div>
        </React.Fragment>
    );

}

export default FacialPalsy;
