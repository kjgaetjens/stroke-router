import React,{useState} from 'react';
import {Redirect} from 'react-router-dom'

//tpa questions
import AgeInRange from './assessment-components/tpa/AgeInRange'
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

    const [componentToRender, setComponentToRender] = useState('AgeInRange')
    const [tpa, setTpa] = useState({
                                    ageInRange: null | Boolean,
                                    lastKnownWell: null | String,
                                    timeSinceLkw: null | String,
                                    recentSurgery: null | Boolean,
                                    pregnancy: null | Boolean,
                                    anticoagulants: null | Boolean
                                    })
    const [race, setRace] = useState({
                                    facialPalsy: null | Number,
                                    armMotorImpairment: null | Number,
                                    legMotorImpairment: null | Number,
                                    gazeDeviation: null | Number,
                                    hemiparesis: null | Boolean,
                                    hemiparesisSide: null | String,
                                    agnosia: null | Number,
                                    aphasia: null | Number
                                    })

    const handleTpaAnswer = (keyName, valueName) => {
        setTpa({...tpa, [keyName]: valueName})
    }

    const handleRaceAnswer = (keyName, valueName) => {
        if (typeof keyName === 'string') {
            setRace({...race, [keyName]: valueName})
        } else {
            setRace({...race, [keyName[0]]: valueName[0], [keyName[1]]: valueName[1]})
        }
        
    }

    const sendToCalcScore = () => {
        const currentDateTime = new Date()

        let lastKnownWell = tpa.lastKnownWell
        let lkwYear = parseInt(lastKnownWell.slice(0,4))
        let lkwMonth = parseInt(lastKnownWell.slice(5,7)) - 1
        let lkwDay = parseInt(lastKnownWell.slice(8,10))
        let lkwHours = parseInt(lastKnownWell.slice(11,13))
        let lkwMinutes = parseInt(lastKnownWell.slice(14,16))
        let lkwSeconds = parseInt(lastKnownWell.slice(17,20))
        const lkwDateTime = new Date(lkwYear, lkwMonth, lkwDay, lkwHours, lkwMinutes, lkwSeconds)

        const timeSinceLkw = currentDateTime - lkwDateTime
        const hoursSinceLkw = Math.trunc(timeSinceLkw/3600000)

        props.history.push('/recommendation', {tpa: {...tpa, timeSinceLkw: hoursSinceLkw}, race: race})
    }

    const renderQuestion = () => {
        switch (componentToRender) {
            case 'AgeInRange':
                return <AgeInRange nextQuestion={setComponentToRender} setAnswer={handleTpaAnswer}/>
            case 'LastKnownWell':
                return <LastKnownWell prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleTpaAnswer} />
            case 'RecentSurgery':
                return <RecentSurgery prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleTpaAnswer} />
            case 'Pregnancy':
                return <Pregnancy prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleTpaAnswer} />
            case 'Anticoagulants':
                return <Anticoagulants prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleTpaAnswer} />
            case 'FacialPalsy':
                return <FacialPalsy prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleRaceAnswer} />
            case 'ArmMotorImpairment':
                return <ArmMotorImpairment prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleRaceAnswer} />
            case 'LegMotorImpairment':
                return <LegMotorImpairment prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleRaceAnswer} />
            case 'GazeDeviation':
                return <GazeDeviation prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleRaceAnswer} />
            case 'Hemiparesis':
                return <Hemiparesis prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleRaceAnswer} completeAssessment={sendToCalcScore} />
            case 'Agnosia':
                return <Agnosia prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleRaceAnswer} completeAssessment={sendToCalcScore} />
            case 'Aphasia':
                return <Aphasia prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} setAnswer={handleRaceAnswer} completeAssessment={sendToCalcScore} />
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
