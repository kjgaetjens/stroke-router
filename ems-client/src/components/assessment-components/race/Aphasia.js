import React,{useState} from 'react';

function Aphasia(props) {

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

    const goBack = (answer) => {
        props.setAnswer('aphasia', null)
        props.prevQuestion('Hemiparesis')
    }

    const submitAnswer = (answer) => {
        props.setAnswer('aphasia', answer)
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
                <span className="question-text">Is the patient experiencing Aphasia? <i className="fas fa-info-circle" onClick={() => displayInfo()}></i></span><span className="info-icon-span"></span>
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
