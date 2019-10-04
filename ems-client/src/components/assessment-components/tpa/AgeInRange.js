import React from 'react';

function AgeInRange(props) {

    const submitAnswer = (answer) => {
        props.setAnswer('ageInRange', answer)
        props.nextQuestion('LastKnownWell')
    }

    return (
        <React.Fragment>
        <div className="assessment-header">
            <span>{'< Back'}</span>
            <h3>tPA Exclusion Assessment</h3>
        </div>
        <div className="progress-border">
            <div className="progress-fill"></div>
        </div>
        <div className="assessment-container">
            <div className="question-container">
                <h1>Is the patient over the age of 18 and under the age of 80?</h1>
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
