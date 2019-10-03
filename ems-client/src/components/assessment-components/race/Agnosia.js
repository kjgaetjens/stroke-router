import React from 'react';

function Agnosia(props) {

    const goBack = (answer) => {
        props.setAnswer('agnosia', null)
        props.prevQuestion('Hemiparesis')
    }

    const submitAnswer = (answer) => {
        props.setAnswer('agnosia', answer)
    }

    return (
        <div>
            Agnosia
            <button onClick={() => goBack()}>Back</button>
            <button onClick={() => submitAnswer(0)}>Patient recognizes his/her arm and the impairment</button>
            <button onClick={() => submitAnswer(1)}>Does not recognize his/her arm or the impairment</button>
            <button onClick={() => submitAnswer(2)}>Does not recognize his/her arm nor the impairment</button>
        </div>
    );

}

export default Agnosia;
