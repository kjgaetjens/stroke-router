import React,{useState} from 'react';

function Anticoagulants(props) {

    const [infoBox, setInfoBox] = useState(false)

    const displayInfo = () => {
        infoBox ? setInfoBox(false) : setInfoBox(true)
    }

    const createInfoBox = () => {
        return (
            <div className="info-text">
                Common types include <b>heparin</b>, <b>warfarin</b> (Coumadin), <b>rivaroxaban</b> (Xarelto), <b>dabigatran</b> (Pradaxa) & <b>apixaban</b> (Eliquis)
            </div>
        )
    }
    
    const submitAnswer = (answer) => {
        props.setAnswer('anticoagulants', answer)
        props.nextQuestion('FacialPalsy')
    }

    return (
        <React.Fragment>
        <div className="assessment-header">
            <button onClick={() => props.prevQuestion('Pregnancy')}>{`< Back`}</button>
            <h4>tPA Exclusion Assessment</h4>
            <div className="progress-border">
                <div className="progress-fill"></div>
            </div>
        </div>

        <div className="assessment-container">
            <div className="question-container">
                <span className="question-text">Is the patient on anticoagulants? <i className="fas fa-info-circle" onClick={() => displayInfo()}></i></span>
                {infoBox ? createInfoBox() : null}
            </div>
            <div className="answer-container">
                <button onClick={() => submitAnswer(true)}>Yes</button>
                <button onClick={() => submitAnswer(false)}>No</button>
                <button onClick={() => props.nextQuestion('FacialPalsy')}>Unknown</button>
            </div>
        </div>
        </React.Fragment>
    );

}

export default Anticoagulants;
