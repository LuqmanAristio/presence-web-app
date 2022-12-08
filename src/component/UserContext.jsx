import { createContext, useContext } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';

const UserContext = createContext();
const UserUpdateContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function useUserUpdate() {
    return useContext(UserUpdateContext);
}

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useSessionStorage('user', null);
    return (
        <UserContext.Provider value={currentUser}>
            <UserUpdateContext.Provider value={setCurrentUser}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    )
}