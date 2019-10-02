import React from 'react';

function FacialPalsy(props) {

    const submitAnswer = (answer) => {
        props.setAnswer('facialPalsy', answer)
        props.nextQuestion(8)
    }

    return (
        <div>
            FacialPalsy
            <button onClick={() => props.prevQuestion(6)}>Back</button>
            <button onClick={() => submitAnswer(0)}>Absent</button>
            <button onClick={() => submitAnswer(1)}>Mild</button>
            <button onClick={() => submitAnswer(2)}>Moderate to Severe</button>
        </div>
    );

}

export default FacialPalsy;
