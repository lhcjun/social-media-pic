import React, { useReducer } from 'react';
import UserContext from '../contexts/user/user.context';
import { reducer, initialState } from '../reducers/user/user.reducer';
import App from './App';


const Root = () => {
    // can't implement hook in index.js (not a functional component)
    const [ state, dispatch ] = useReducer(reducer, initialState);
    
    return(
      <UserContext.Provider value={{ state, dispatch }}>   {/* similar to Redux <Provider store={store}> */}
          <App />   
      </UserContext.Provider>
    )
};

export default Root;