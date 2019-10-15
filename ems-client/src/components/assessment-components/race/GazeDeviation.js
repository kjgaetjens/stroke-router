import React,{useState} from 'react';

function GazeDeviation(props) {

    const [infoBox, setInfoBox] = useState(false)

    const displayInfo = () => {
        infoBox ? setInfoBox(false) : setInfoBox(true)
    }

    const createInfoBox = () => {
        return (
            <div className="info-text">
                <b>Absent/mild</b> - Eyes move freely, or with slight resistance from side to side. <b>Present</b> - Eyes show clear preference to one side
            </div>
        )
    }

    const submitAnswer = (answer) => {
        props.setAnswer('gazeDeviation', answer)
        props.nextQuestion('Hemiparesis')
    }

    return (
        <React.Fragment>
        <div className="assessment-header">
            <a onClick={() => props.prevQuestion('LegMotorImpairment')}>{`< Back`}</a>
            <h4>RACE Assessment</h4>
            <div className="progress-border">
                <div className="progress-fill"></div>
            </div>
        </div>

        <div className="assessment-container">
            <div className="question-container">
                <span className="question-text">Is the patient experiencing gaze deviation? <i className="fas fa-info-circle" onClick={() => displayInfo()}></i></span>
                {infoBox ? createInfoBox() : null}
            </div>
            <div className="answer-container">
                <button onClick={() => submitAnswer(0)}>Absent</button>
                <button onClick={() => submitAnswer(1)}>Present</button>
            </div>
        </div>
        </React.Fragment>
    );

}

export default GazeDeviation;
