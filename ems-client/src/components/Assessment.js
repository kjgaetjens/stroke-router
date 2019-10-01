import React,{useState, useEffect} from 'react';
import axios from 'axios'

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

    //store answers in redux

    //store question count in redux

    //how will conditional question flow work? do i need to nest some question components in other question components so that when theyre in that next, it goes to the relevant next?
    //need to figure out from eric which are conditional first

    const [componentToRender, setComponentToRender] = useState(1)


    const renderQuestion = () => {
        switch (componentToRender) {
            case 1:
                return <AgeUnder80 />
            case 2:
                return <AgeOver18 />
            case 3:
                return <LastKnownWell />
            case 4:
                return <RecentSurgery />
            case 5:
                return <Pregnancy />
            case 6:
                return <Anticoagulants />
            case 7:
                return <FacialPalsy />
            case 8:
                return <ArmMotorImpairment />
            case 9:
                return <LegMotorImpairment />
            case 10:
                return <GazeDeviation />
            case 11:
                return <Hemiparesis />
            case 12:
                return <Agnosia />
            case 13:
                return <Aphasia />
            case 14:
                return <Score />
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
