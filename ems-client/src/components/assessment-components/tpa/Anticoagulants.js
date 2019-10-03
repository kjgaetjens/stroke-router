import React from 'react';

function Anticoagulants(props) {

    const submitAnswer = (answer) => {
        props.setAnswer('anticoagulants', answer)
        props.nextQuestion('FacialPalsy')
    }

    return (
        <div>
            Anticoagulants
            <button onClick={() => props.prevQuestion('Pregnancy')}>Back</button>
            <button onClick={() => submitAnswer(true)}>Yes</button>
            <button onClick={() => submitAnswer(false)}>No</button>
            <button onClick={() => props.nextQuestion('FacialPalsy')}>Unknown</button>
        </div>
    );

}

export default Anticoagulants;
