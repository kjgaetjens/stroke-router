import React from 'react';

function Pregnancy(props) {

    const submitAnswer = (answer) => {
        props.setAnswer('pregnancy', answer)
        props.nextQuestion(6)
    }

    return (
        <div>
            Pregnancy
            <button onClick={() => props.prevQuestion(4)}>Back</button>
            <button onClick={() => submitAnswer(true)}>Yes</button>
            <button onClick={() => submitAnswer(false)}>No</button>
            <button onClick={() => props.nextQuestion(6)}>Unknown</button>
        </div>
    );

}

export default Pregnancy;
