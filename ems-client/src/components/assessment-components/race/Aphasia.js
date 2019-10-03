import React from 'react';

function Aphasia(props) {

    const goBack = (answer) => {
        props.setAnswer('aphasia', null)
        props.prevQuestion('Hemiparesis')
    }

    const submitAnswer = (answer) => {
        props.setAnswer('aphasia', answer)
    }

    return (
        <div>
            Aphasia
            <button onClick={() => goBack()}>Back</button>
            <button onClick={() => submitAnswer(0)}>Performs both tasks correctly</button>
            <button onClick={() => submitAnswer(1)}>Performs 1 task correctly</button>
            <button onClick={() => submitAnswer(2)}>Performs neither task</button>
        </div>
    );

}

export default Aphasia;
