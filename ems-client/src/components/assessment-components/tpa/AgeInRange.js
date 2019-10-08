import React,{useState} from 'react';

function AgeInRange(props) {

    const [infoBox, setInfoBox] = useState(false)


    const displayInfo = () => {
        infoBox ? setInfoBox(false) : setInfoBox(true)
    }

    const createInfoBox = () => {
        return (
            <div className="info-text">
                
            </div>
        )
    }
    // <i className="fas fa-info-circle" onClick={() => displayInfo()}></i>

    const submitAnswer = (answer) => {
        props.setAnswer('ageInRange', answer)
        props.nextQuestion('LastKnownWell')
    }


    return (
        <React.Fragment>
        <div className="assessment-header">
            <h4>tPA Exclusion Assessment</h4>
            <div className="progress-border">
                <div className="progress-fill"></div>
            </div>
        </div>

        <div className="assessment-container">
            <div className="question-container">
                <span className="question-text">Is the patient over the age of 18 and under the age of 80? </span>
                {/* {infoBox ? createInfoBox() : null} */}
            </div>
            <div className="answer-container">
                <button onClick={() => submitAnswer(true)}>Yes</button>
                <button onClick={() => submitAnswer(false)}>No</button>
                <button onClick={() => props.nextQuestion('LastKnownWell')}>Unknown</button>
            </div>
        </div>
        </React.Fragment>
    );

}

export default AgeInRange;
