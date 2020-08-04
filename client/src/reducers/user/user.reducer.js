export const initialState = {
    user: null
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return{
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}


// action creator
export const setCurrentUser = user => ({          
    type: 'SET_CURRENT_USER',
    payload: user
})