import React from 'react';

function AgeInRange(props) {

    const submitAnswer = (answer) => {
        props.setAnswer('ageInRange', answer)
        props.nextQuestion('LastKnownWell')
    }

    return (
        <div>
            AgeInRange
            <button onClick={() => submitAnswer(true)}>Yes</button>
            <button onClick={() => submitAnswer(false)}>No</button>
            <button onClick={() => props.nextQuestion('LastKnownWell')}>Unknown</button>
        </div>
    );

}

export default AgeInRange;
