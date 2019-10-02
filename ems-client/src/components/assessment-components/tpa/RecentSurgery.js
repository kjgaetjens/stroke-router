import React from 'react';

function RecentSurgery(props) {

    const submitAnswer = (answer) => {
        props.setAnswer('recentSurgery', answer)
        props.nextQuestion(5)
    }

    return (
        <div>
            RecentSurgery
            <button onClick={() => props.prevQuestion(3)}>Back</button>
            <button onClick={() => submitAnswer(true)}>Yes</button>
            <button onClick={() => submitAnswer(false)}>No</button>
            <button onClick={() => props.nextQuestion(5)}>Unknown</button>
        </div>
    );

}

export default RecentSurgery;
