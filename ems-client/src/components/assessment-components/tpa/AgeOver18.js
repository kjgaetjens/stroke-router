import React from 'react';

function AgeOver18(props) {

    const submitAnswer = (answer) => {
        props.setAnswer('ageOver18', answer)
        props.nextQuestion(3)
    }

    return (
        <div>
            AgeOver18
            <button onClick={() => props.prevQuestion(1)}>Back</button>
            <button onClick={() => submitAnswer(true)}>Yes</button>
            <button onClick={() => submitAnswer(false)}>No</button>
            <button onClick={() => props.nextQuestion(3)}>Unknown</button>
        </div>
    );

}

export default AgeOver18;
