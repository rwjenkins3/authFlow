import { createContext } from 'react';

const Context = createContext(
    { 
        profile: null, 
        setProfile: (user) => {}, 
        storeProfile: (user) => {},
        logOut: () => {} 
    });

export default Context;