import React,{useState} from 'react';

function LastKnownWell(props) {

    const [lkwTime, setLkwTime] = useState('')

    const handleAnswer = (e) => {

        setLkwTime(e.target.value)

    }

    const submitAnswer = () => {

        const currentDateTime = new Date()
        const currentHour = currentDateTime.getHours()
        const currentMinute = currentDateTime.getMinutes()
        const lkwHour = parseInt(lkwTime[0]+lkwTime[1])
        const lkwMinute = parseInt(lkwTime[4]+lkwTime[5])

        const generateLkwDateTimeString = () => {
            let lkwDateTimeString
            //determine if lkw date is current date or previous date
            if (lkwHour < currentHour || (lkwHour === currentHour && lkwMinute < currentMinute)) {
                let currentDateString = (currentDateTime.toISOString()).slice(0,11)
                lkwDateTimeString = `${currentDateString}${lkwTime}.000Z`
            } else {
                let yesterdayDateTime = new Date()
                yesterdayDateTime.setDate(currentDateTime.getDate() - 1)
                let yesterdayDateString = (yesterdayDateTime.toISOString()).slice(0,11)
                lkwDateTimeString = `${yesterdayDateString}${lkwTime}.000Z`
            }
            return lkwDateTimeString
        }

        const lkwDateTimeString = generateLkwDateTimeString()


        props.setAnswer('lastKnownWell', lkwDateTimeString)
        props.nextQuestion('RecentSurgery')

    }

    return (
        <div>
            LastKnownWell
            <button onClick={() => {props.prevQuestion('AgeInRange')}}>Back</button>
            <input type="time" name="lkw-time" onChange={(e) => handleAnswer(e)}></input>
            <button onClick={() => submitAnswer()}>Submit</button>
            <button onClick={() => props.nextQuestion('RecentSurgery')}>More than 24 hours ago</button>
            <button onClick={() => props.nextQuestion('RecentSurgery')}>Unknown</button>
        </div>
    );

}

export default LastKnownWell;
