const INITIAL_STATE = {
    user: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return{
                ...state,
                user: action.payload
            }
        // case 'SET_SEARCH_QUERY':
        //     return {
        //         ...state,
        //         searchQuery: action.payload
        //     }
        default:
            return state;
    }
}


// action creator
const setUser = user => ({          
    type: 'SET_USER',
    payload: user
})