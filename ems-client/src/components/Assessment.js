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
import Score from './assessment-components/race/Score'


function Assessment(props) {
    
    //store patient id in redux

    //how will conditional question flow work? do i need to nest some question components in other question components so that when theyre in that next, it goes to the relevant next?
    //need to figure out from eric which are conditional first

    const [componentToRender, setComponentToRender] = useState(1)


    //update to use redux for component to render
    const renderQuestion = () => {
        switch (componentToRender) {
            case 1:
                return <AgeUnder80 nextQuestion={setComponentToRender}/>
            case 2:
                return <AgeOver18 prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} />
            case 3:
                return <LastKnownWell prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} />
            case 4:
                return <RecentSurgery prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} />
            case 5:
                return <Pregnancy prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} />
            case 6:
                return <Anticoagulants prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} />
            case 7:
                return <FacialPalsy prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} />
            case 8:
                return <ArmMotorImpairment prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} />
            case 9:
                return <LegMotorImpairment prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} />
            case 10:
                return <GazeDeviation prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} />
            case 11:
                return <Hemiparesis prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} />
            case 12:
                return <Agnosia prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} />
            case 13:
                return <Aphasia prevQuestion={setComponentToRender} nextQuestion={setComponentToRender} />
            case 14:
                return <Score prevQuestion={setComponentToRender} />
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
