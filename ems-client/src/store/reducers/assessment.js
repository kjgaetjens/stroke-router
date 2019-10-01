import * as actionTypes from '../actions/actionTypes'

const initialState = {
    patientId: '',
    componentToRender: 1,
    tpa: {}, //need to populate with starting key:value pairs
    race: {} //need to populate with starting key:value pairs
}

/* placeholder to be replaced
const reducer = (state = initialState, action) => {

    switch(action.type) {
            
        case X:
            return {
                ...state, 
                tasks: state.tasks.concat(Y.payload)
            }
    }

    return state
}*/

export default reducer