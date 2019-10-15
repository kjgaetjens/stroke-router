import React,{useState} from 'react';

function ArmMotorImpairment(props) {

    const [infoBox, setInfoBox] = useState(false)

    const displayInfo = () => {
        infoBox ? setInfoBox(false) : setInfoBox(true)
    }

    const createInfoBox = () => {
        return (
            <div className="info-text">
                Extend arm 90deg if sitting, 45deg if prone. Check <b>severe</b> if there is no effort against gravity, <b>moderate</b> if arm drifts down within 10 seconds.
            </div>
        )
    }

    const submitAnswer = (answer) => {
        props.setAnswer('armMotorImpairment', answer)
        props.nextQuestion('LegMotorImpairment')
    }


    return (
        <React.Fragment>
        <div className="assessment-header">
            <a onClick={() => props.prevQuestion('FacialPalsy')}>{`< Back`}</a>
            <h4>RACE Assessment</h4>
            <div className="progress-border">
                <div className="progress-fill"></div>
            </div>
        </div>

        <div className="assessment-container">
            <div className="question-container">
                <span className="question-text">Is the patient experiencing any arm weakness?<i className="fas fa-info-circle" onClick={() => displayInfo()}></i></span>
                {infoBox ? createInfoBox() : null}
            </div>
            <div className="answer-container">
                <button onClick={() => submitAnswer(0)}>Normal to Mild</button>
                <button onClick={() => submitAnswer(1)}>Moderate</button>
                <button onClick={() => submitAnswer(2)}>Severe</button>
            </div>
        </div>
        </React.Fragment>
    );

}

export default ArmMotorImpairment;
