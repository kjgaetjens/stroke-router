
import * as actionTypes from './actionTypes'

export const setAuthState = (user) => {
    return {
        type: 'SET_AUTH',
        payload: user
    }
}

export const setUser = (userId) => {
    return {
        type: 'SET_USER',
        payload: userId
    }
}

// export const setPatient = (patientId) => {
//     return {
//         type: actionTypes.SET_PATIENT, 
//         payload: patientId
//     }
// }

// export const storeAnswer = (answerObj) => {
//     return {
//         type: actionTypes.STORE_ANSWER, 
//         payload: answerObj
//     }
// }

// export const incrementComponentToRender = () => {
//     return {
//         type: actionTypes.INC_COMP_TO_RENDER
//     }
// }

// export const decrementComponentToRender = () => {
//     return {
//         type: actionTypes.DEC_COMP_TO_RENDER
//     }
// }