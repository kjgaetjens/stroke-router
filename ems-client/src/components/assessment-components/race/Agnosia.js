import React,{useState} from 'react';

function Agnosia(props) {

    const [infoBox, setInfoBox] = useState(false)

    const displayInfo = () => {
        infoBox ? setInfoBox(false) : setInfoBox(true)
    }

    const createInfoBox = () => {
        return (
            <div className="info-text">
                this is help text for this question. boiler plate boiler plate boiler plate boiler plate boiler plate boiler plate
            </div>
        )
    }

    const goBack = (answer) => {
        props.setAnswer('agnosia', null)
        props.prevQuestion('Hemiparesis')
    }

    const submitAnswer = (answer) => {
        props.setAnswer('agnosia', answer)
    }

    return (
        <React.Fragment>
        <div className="assessment-header">
            <button onClick={() => goBack()}>{`< Back`}</button>
            <h4>RACE Assessment</h4>
            <div className="progress-border">
                <div className="progress-fill"></div>
            </div>
        </div>

        <div className="assessment-container">
            <div className="question-container">
                <span className="question-text">Is the patient experiencing Agnosia/Neglect? <i className="fas fa-info-circle" onClick={() => displayInfo()}></i></span><span className="info-icon-span"></span>
                {infoBox ? createInfoBox() : null}
            </div>
            <div className="answer-container">
                <button onClick={() => submitAnswer(0)}>Patient recognizes his/her arm and the impairment</button>
                <button onClick={() => submitAnswer(1)}>Does not recognize his/her arm or the impairment</button>
                <button onClick={() => submitAnswer(2)}>Does not recognize his/her arm nor the impairment</button>
            </div>
        </div>
        </React.Fragment>
    );

}

export default Agnosia;
