const initialState = {
    isAuth: false,
    userId: ""
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_AUTH': 
            return {
                ...state,
                isAuth: action.payload.token ? true : false,
                userId: action.payload.userId
            }
        case 'SET_USER':
            return {
                ...state,
                userId: action.payload
            }
        default:
            return state
    }
}

export default reducer