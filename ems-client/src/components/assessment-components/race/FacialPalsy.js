import React from 'react';

function FacialPalsy(props) {

    const submitAnswer = (answer) => {
        props.setAnswer('facialPalsy', answer)
        props.nextQuestion('ArmMotorImpairment')
    }

    return (
        <div>
            FacialPalsy
            <button onClick={() => props.prevQuestion('Anticoagulants')}>Back</button>
            <button onClick={() => submitAnswer(0)}>Absent</button>
            <button onClick={() => submitAnswer(1)}>Mild</button>
            <button onClick={() => submitAnswer(2)}>Moderate to Severe</button>
        </div>
    );

}

export default FacialPalsy;
