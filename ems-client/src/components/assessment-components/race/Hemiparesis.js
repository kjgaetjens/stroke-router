import React from 'react';

function Hemiparesis (props) {

    const submitAnswer = (answer) => {
        props.setAnswer(['hemiparesis', 'hemiparesisSide'], answer)
        switch (answer[1]) {
            case null:
                props.completeAssessment()
                return
            case 'left':
                props.nextQuestion('Agnosia')
                return
            case 'right':
                props.nextQuestion('Aphasia')
                return
        }
    }

    return (
        <div>
            Hemiparesis
            <button onClick={() => props.prevQuestion('GazeDeviation')}>Back</button>
            <button onClick={() => submitAnswer([false, null])}>Absent</button>
            <button onClick={() => submitAnswer([true, 'left'])}>Left Side</button>
            <button onClick={() => submitAnswer([true, 'right'])}>Right Side</button>
        </div>
    );

}

export default Hemiparesis;
