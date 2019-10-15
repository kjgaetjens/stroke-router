import React,{useState} from 'react';

function Aphasia(props) {

    const [infoBox, setInfoBox] = useState(false)

    const displayInfo = () => {
        infoBox ? setInfoBox(false) : setInfoBox(true)
    }

    const createInfoBox = () => {
        return (
            <div className="info-text">
                Does the patient understand commands? Ask the patient to close their eyes, and make a fist.<br/><b>Moderate:</b> Patient performs 1 task correctly.<br /><b>Severe:</b> Patient performs neither task correctly.
            </div>
        )
    }

    const goBack = () => {
        props.setAnswer('aphasia', null)
        props.prevQuestion('Hemiparesis')
    }

    const submitAnswer = (answer) => {
        props.setAnswer(['aphasia', 'ready'], [answer, true])
    }

    return (
        <React.Fragment>
        <div className="assessment-header">
            <a onClick={() => goBack()}>{`< Back`}</a>
            <h4>RACE Assessment</h4>
            <div className="progress-border">
                <div className="progress-fill"></div>
            </div>
        </div>

        <div className="assessment-container">
            <div className="question-container">
                <span className="question-text">Is the patient experiencing Aphasia? <i className="fas fa-info-circle" onClick={() => displayInfo()}></i></span>
                {infoBox ? createInfoBox() : null}
            </div>
            <div className="answer-container">
                <button onClick={() => submitAnswer(0)}>Performs both tasks correctly</button>
                <button onClick={() => submitAnswer(1)}>Performs 1 task correctly</button>
                <button onClick={() => submitAnswer(2)}>Performs neither task</button>
            </div>
        </div>
        </React.Fragment>
    );

}

export default Aphasia;
