import React from 'react';

function LegMotorImpairment(props) {

    const submitAnswer = (answer) => {
        props.setAnswer('legMotorImpairment', answer)
        props.nextQuestion('GazeDeviation')
    }

    return (
        <div>
            LegMotorImpairment
            <button onClick={() => props.prevQuestion('ArmMotorImpairment')}>Back</button>
            <button onClick={() => submitAnswer(0)}>Normal to Mild</button>
            <button onClick={() => submitAnswer(1)}>Moderate</button>
            <button onClick={() => submitAnswer(2)}>Severe</button>
        </div>
    );

}

export default LegMotorImpairment;
