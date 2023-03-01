import { createContext } from 'react';

const Context = createContext(
    { 
        profile: null, 
        setProfile: (user) => {}, 
        storeProfile: (user) => {} 
    });

export default Context;