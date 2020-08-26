export const initialState = {
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'CLEAR_USER_STATE':
      return {
        ...state,
        user: null,
      };
    case 'UPDATE_USER_FOLLOW':
      return {
        ...state,
        user: {
          ...action.payload,
          following: action.payload.following,
          followers: action.payload.followers,
        },
      };
    default:
      return state;
  }
};

// action creator
export const setCurrentUser = (user) => ({
  type: 'SET_CURRENT_USER',
  payload: user,
});

export const clearUserState = () => ({
  type: 'CLEAR_USER_STATE',
});

export const updateUserFollow = (followerUser) => ({
  type: 'UPDATE_USER_FOLLOW',
  payload: followerUser,
});
