import React,{useState} from 'react';

function ArmMotorImpairment(props) {

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
        props.setAnswer('armMotorImpairment', answer)
        props.nextQuestion('LegMotorImpairment')
    }


    return (
        <React.Fragment>
        <div className="assessment-header">
            <button onClick={() => props.prevQuestion('FacialPalsy')}>{`< Back`}</button>
            <h4>RACE Assessment</h4>
            <div className="progress-border">
                <div className="progress-fill"></div>
            </div>
        </div>

        <div className="assessment-container">
            <div className="question-container">
                <span className="question-text">Is the patient experiencing any arm weakness?<i className="fas fa-info-circle" onClick={() => displayInfo()}></i></span><span className="info-icon-span"></span>
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
