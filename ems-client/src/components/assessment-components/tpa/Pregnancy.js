import React,{useState} from 'react';

function Pregnancy(props) {

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
        props.setAnswer('pregnancy', answer)
        props.nextQuestion('Anticoagulants')
    }

    return (
        <React.Fragment>
        <div className="assessment-header">
            <a onClick={() => props.prevQuestion('RecentSurgery')}>{`< Back`}</a>
            <h4>tPA Exclusion Assessment</h4>
            <div className="progress-border">
                <div className="progress-fill"></div>
            </div>
        </div>

        <div className="assessment-container">
            <div className="question-container">
                <span className="question-text">Is the patient pregnant? </span>
                {/* {infoBox ? createInfoBox() : null} */}
            </div>
            <div className="answer-container">
                <button onClick={() => submitAnswer(true)}>Yes</button>
                <button onClick={() => submitAnswer(false)}>No</button>
                <button onClick={() => props.nextQuestion('Anticoagulants')}>Unknown</button>
            </div>
        </div>
        </React.Fragment>
    );

}

export default Pregnancy;
