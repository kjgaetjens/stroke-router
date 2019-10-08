import React,{useState} from 'react';

function Hemiparesis (props) {

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
        props.setAnswer(['hemiparesis', 'hemiparesisSide'], answer)
        switch (answer[1]) {
            case null:
                props.completeAssessment()
                return
            case 'left':
                props.nextQuestion('Agnosia')
                return
            case 'right':
                props.nextQuestion('Aphasia')
                return
        }
    }

    return (
        <React.Fragment>
        <div className="assessment-header">
            <button onClick={() => props.prevQuestion('GazeDeviation')}>{`< Back`}</button>
            <h4>RACE Assessment</h4>
            <div className="progress-border">
                <div className="progress-fill"></div>
            </div>
        </div>

        <div className="assessment-container">
            <div className="question-container">
                <span className="question-text"> Is patient experiencing hemiparesis? <i className="fas fa-info-circle" onClick={() => displayInfo()}></i></span><span className="info-icon-span"></span>
                {infoBox ? createInfoBox() : null}
            </div>
            <div className="answer-container">
                <button onClick={() => submitAnswer([false, null])}>Absent</button>
                <button onClick={() => submitAnswer([true, 'left'])}>Left Side</button>
                <button onClick={() => submitAnswer([true, 'right'])}>Right Side</button>
            </div>
        </div>
        </React.Fragment>
    );

}

export default Hemiparesis;
