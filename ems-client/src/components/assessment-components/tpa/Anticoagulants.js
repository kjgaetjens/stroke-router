import React from 'react';

function Anticoagulants(props) {

    const submitAnswer = (answer) => {
        props.setAnswer('anticoagulants', answer)
        props.nextQuestion(7)
    }

    return (
        <div>
            Anticoagulants
            <button onClick={() => props.prevQuestion(5)}>Back</button>
            <button onClick={() => submitAnswer(true)}>Yes</button>
            <button onClick={() => submitAnswer(false)}>No</button>
            <button onClick={() => props.nextQuestion(7)}>Unknown</button>
        </div>
    );

}

export default Anticoagulants;
