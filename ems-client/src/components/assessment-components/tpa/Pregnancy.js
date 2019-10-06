import React from 'react';

function Pregnancy(props) {

    const submitAnswer = (answer) => {
        props.setAnswer('pregnancy', answer)
        props.nextQuestion('Anticoagulants')
    }

    return (
        <div>
            Pregnancy
            <button onClick={() => props.prevQuestion('RecentSurgery')}>Back</button>
            <button onClick={() => submitAnswer(true)}>Yes</button>
            <button onClick={() => submitAnswer(false)}>No</button>
            <button onClick={() => props.nextQuestion('Anticoagulants')}>Unknown</button>
        </div>
    );

}

export default Pregnancy;
