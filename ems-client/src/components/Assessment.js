import React,{useState, useEffect} from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'

//tpa questions
import AgeUnder80 from './assessment-components/tpa/AgeUnder80'
import AgeOver18 from './assessment-components/tpa/AgeOver18'
import LastKnownWell from './assessment-components/tpa/LastKnownWell'
import RecentSurgery from './assessment-components/tpa/RecentSurgery'
import Pregnancy from './assessment-components/tpa/Pregnancy'
import Anticoagulants from './assessment-components/tpa/Anticoagulants'

//race questions
import FacialPalsy from './assessment-components/race/FacialPalsy'
import ArmMotorImpairment from './assessment-components/race/ArmMotorImpairment'
import LegMotorImpairment from './assessment-components/race/LegMotorImpairment'
import GazeDeviation from './assessment-components/race/GazeDeviation'
import Hemiparesis from './assessment-components/race/Hemiparesis'
import Agnosia from './assessment-components/race/Agnosia'
import Aphasia from './assessment-components/race/Aphasia'


function Assessment(props) {

    const [componentToRender, setComponentToRender] = useState(1)
    const [tpa, setTpa] = useState({
                                    ageUnder80: null | Boolean,
                                    ageOver18: null | Boolean,
                                    lastKnownWell: null | String,
                                    timeSinceLkW: null | String,
                                    recentSurgery: null | Boolean,
                                    pregnancy: null | Boolean,
                                    anticoagulants: null | Boolean
                                    })
    const [race, setRace] = useState({
                                    facialPalsy: null | Boolean,
                                    armMotorImpairment: null | Boolean,
                                    legMotorImpairment: null | Boolean,
                                    gazeDeviation: null | Boolean,
                                    hemiparesis: null | Boolean,
                                    agnosia: null | Boolean,
                                    aphasia: null | Boolean,
                                    score: null | Boolean
                                    })

    const handleTpaAnswer = (keyName, valueName) => {
        setTpa({...tpa, [keyName]: valueName})
    }

    const handleRaceAnswer = (keyName, valueName) => {
        setRace({...race, [keyName]: valueName})
    }
    //if go back on conditionals, will have to clear state for related question or set conditional logic on determination

    const renderQuestion = () => {
        switch (componentToRender) {
            case 1:
                return <AgeUnder80 nextQuestion={setComponentToRender} setAnswer={handleTpaAnswer}/>
            case 2:
                return <AgeOver18 prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleTpaAnswer} />
            case 3:
                return <LastKnownWell prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleTpaAnswer} />
            case 4:
                return <RecentSurgery prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleTpaAnswer} />
            case 5:
                return <Pregnancy prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleTpaAnswer} />
            case 6:
                return <Anticoagulants prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleTpaAnswer} />
            case 7:
                return <FacialPalsy prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleRaceAnswer} />
            case 8:
                return <ArmMotorImpairment prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleRaceAnswer} />
            case 9:
                return <LegMotorImpairment prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleRaceAnswer} />
            case 10:
                return <GazeDeviation prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleRaceAnswer} />
            case 11:
                return <Hemiparesis prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleRaceAnswer} />
            case 12:
                return <Agnosia prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleRaceAnswer} />
            case 13:
                return <Aphasia prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleRaceAnswer} />
        }
    }

    // useEffect(() => {},[])

    return (
        <div>
            {renderQuestion()}
        </div>
    );
}

export default Assessment;
