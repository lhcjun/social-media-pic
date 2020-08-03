import { createContext } from 'react';

const UserContext = createContext(null);

export default UserContext;


/*

const NewContext = createContext({         // initial value (obj)
    hidden: true,
    toggleHidden: () => {} 
});

*/