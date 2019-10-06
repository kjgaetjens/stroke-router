import React from 'react';

function ArmMotorImpairment(props) {

    const submitAnswer = (answer) => {
        props.setAnswer('armMotorImpairment', answer)
        props.nextQuestion('LegMotorImpairment')
    }

    return (
        <div>
            ArmMotorImpairment
            <button onClick={() => props.prevQuestion('FacialPalsy')}>Back</button>
            <button onClick={() => submitAnswer(0)}>Normal to Mild</button>
            <button onClick={() => submitAnswer(1)}>Moderate</button>
            <button onClick={() => submitAnswer(2)}>Severe</button>
        </div>
    );

}

export default ArmMotorImpairment;
