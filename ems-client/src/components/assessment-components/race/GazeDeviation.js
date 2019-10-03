import React from 'react';

function GazeDeviation(props) {

    const submitAnswer = (answer) => {
        props.setAnswer('gazeDeviation', answer)
        props.nextQuestion('Hemiparesis')
    }

    return (
        <div>
            GazeDeviation
            <button onClick={() => props.prevQuestion('LegMotorImpairment')}>Back</button>
            <button onClick={() => submitAnswer(0)}>Absent</button>
            <button onClick={() => submitAnswer(1)}>Present</button>
        </div>
    );

}

export default GazeDeviation;
