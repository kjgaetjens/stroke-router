import React from 'react';

function AgeUnder80(props) {

    const submitAnswer = (answer) => {
        props.setAnswer('ageUnder80', answer)
        props.nextQuestion(2)
    }

    return (
        <div>
            AgeUnder80
            <button onClick={() => submitAnswer(true)}>Yes</button>
            <button onClick={() => submitAnswer(false)}>No</button>
            <button onClick={() => props.nextQuestion(2)}>Unknown</button>
        </div>
    );

}

export default AgeUnder80;
