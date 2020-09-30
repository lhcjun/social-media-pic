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
    case 'UPDATE_USER_AVATAR':
      return {
        ...state,
        user: {
          ...action.payload,
          profileImg: action.payload.profileImg,
        },
      };
    case 'UPDATE_USER_PROFILE':
      return {
        ...state,
        user: {
          ...action.payload,
          bio: action.payload.bio,
          name: action.payload.name,
        },
      };
    case 'UPDATE_USER_SAVE_POST':
      return {
        ...state,
        user: {
          ...action.payload,
          saved: action.payload.saved,
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

export const updateUserAvatar = (updatedUser) => ({
  type: 'UPDATE_USER_AVATAR',
  payload: updatedUser,
});

export const updateUserProfile = (updatedUser) => ({
  type: 'UPDATE_USER_PROFILE',
  payload: updatedUser,
});

export const updateUserSavePost = (savePostUser) => ({
  type: 'UPDATE_USER_SAVE_POST',
  payload: savePostUser,
});
