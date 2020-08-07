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
        case 'CLEAR_USER_STATE':
            return{
                ...state,
                user: null
            }
        default:
            return state;
    }
}


// action creator
export const setCurrentUser = user => ({          
    type: 'SET_CURRENT_USER',
    payload: user
});

export const clearUserState = () => ({          
    type: 'CLEAR_USER_STATE'
});