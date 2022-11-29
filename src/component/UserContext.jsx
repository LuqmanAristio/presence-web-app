import { useState, createContext, useContext } from 'react';

const UserContext = createContext();
const UserUpdateContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function useUserUpdate() {
    return useContext(UserUpdateContext);
}

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    return (
        <UserContext.Provider value={currentUser}>
            <UserUpdateContext.Provider value={setCurrentUser}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    )
}