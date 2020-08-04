import { createContext } from 'react';

const UserContext = createContext(null);

export default UserContext;


/*
Context API　－
    to solve props drilling 
    so that the middle components won't need to help passing props

const NewContext = createContext({         // initial value (obj)
    hidden: true,
    toggleHidden: () => {} 
});

*/