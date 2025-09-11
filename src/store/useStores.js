import React, { createContext, useContext } from 'react';

export const StoresContext = createContext(undefined);

export const useStores = () => {
    const store = useContext(StoresContext);
    if (!store) {
        throw new Error('useStores must be used within a Provider');
    }
    return store;
};

export const StoresProvider = ({ children, ...stores }) => {
    return (
        <StoresContext.Provider value={stores}>
            {children}
        </StoresContext.Provider>
    );
};