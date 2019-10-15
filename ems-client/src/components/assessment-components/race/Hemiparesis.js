import React,{useState} from 'react';

function Hemiparesis (props) {

    const [infoBox, setInfoBox] = useState(false)

    const displayInfo = () => {
        infoBox ? setInfoBox(false) : setInfoBox(true)
    }

    const createInfoBox = () => {
        return (
            <div className="info-text">
                Patient shows clear lateral weakness in arms, legs, and/or facial muscles. This response will code into either Agnosia or Aphasia assessment depending on affected side.
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
            <a onClick={() => props.prevQuestion('GazeDeviation')}>{`< Back`}</a>
            <h4>RACE Assessment</h4>
            <div className="progress-border">
                <div className="progress-fill"></div>
            </div>
        </div>

        <div className="assessment-container">
            <div className="question-container">
                <span className="question-text"> Does patient have definite hemiparesis? <i className="fas fa-info-circle" onClick={() => displayInfo()}></i></span><span className="info-icon-span"></span>
                {infoBox ? createInfoBox() : null}
            </div>
            <div className="answer-container">
                <button onClick={() => submitAnswer([false, null])}>Absent</button>
                <button onClick={() => submitAnswer([true, 'left'])}>Present: Left Side</button>
                <button onClick={() => submitAnswer([true, 'right'])}>Present: Right Side</button>
            </div>
        </div>
        </React.Fragment>
    );

}

export default Hemiparesis;
