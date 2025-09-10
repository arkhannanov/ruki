import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Context } from 'react';

export const useStores = () => {
    const store = useContext(StoresContext);
    if (!store) {
        throw new Error('useStores must be used within a Provider');
    }
    return store;
};

const StoresContext = React.createContext();

export const Provider = ({ children, ...stores }) => {
    return (
        <StoresContext.Provider value={stores}>
            {children}
        </StoresContext.Provider>
    );
};