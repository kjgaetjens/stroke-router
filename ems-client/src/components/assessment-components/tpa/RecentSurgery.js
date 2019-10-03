import React from 'react';

function RecentSurgery(props) {

    const submitAnswer = (answer) => {
        props.setAnswer('recentSurgery', answer)
        props.nextQuestion('Pregnancy')
    }

    return (
        <div>
            RecentSurgery
            <button onClick={() => props.prevQuestion('LastKnownWell')}>Back</button>
            <button onClick={() => submitAnswer(true)}>Yes</button>
            <button onClick={() => submitAnswer(false)}>No</button>
            <button onClick={() => props.nextQuestion('Pregnancy')}>Unknown</button>
        </div>
    );

}

export default RecentSurgery;
