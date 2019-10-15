import React,{useState} from 'react';

function Agnosia(props) {

    const [infoBox, setInfoBox] = useState(false)

    const displayInfo = () => {
        infoBox ? setInfoBox(false) : setInfoBox(true)
    }

    const createInfoBox = () => {
        return (
            <div className="info-text">
                Refer to the patient's weak arm, and ask "Whose arm is this?" Ask the patient to move that arm.<br /><b>Moderate:</b> Patient performs 1 task correctly.<br /><b>Severe:</b> Patient performs neither task correctly
            </div>
        )
    }

    const goBack = () => {
        props.setAnswer('agnosia', null)
        props.prevQuestion('Hemiparesis')
    }

    const submitAnswer = (answer) => {
        props.setAnswer(['agnosia', 'ready'], [answer, true])
    }

    return (
        <React.Fragment>
        <div className="assessment-header">
            <button onClick={() => goBack()}>{`< Back`}</button>
            <h4>RACE Assessment</h4>
            <div className="progress-border">
                <div className="progress-fill"></div>
            </div>
        </div>

        <div className="assessment-container">
            <div className="question-container">
                <span className="question-text">Is the patient experiencing Agnosia/Neglect? <i className="fas fa-info-circle" onClick={() => displayInfo()}></i></span>
                {infoBox ? createInfoBox() : null}
            </div>
            <div className="answer-container">
                <button onClick={() => submitAnswer(0)}>Absent</button>
                <button onClick={() => submitAnswer(1)}>Moderate</button>
                <button onClick={() => submitAnswer(2)}>Severe</button>
            </div>
        </div>
        </React.Fragment>
    );

}

export default Agnosia;
