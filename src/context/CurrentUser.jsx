import { useState, createContext } from "react";

export const UserContext = createContext('username2')
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState('Johnny')
    return (
        <UserContext.Provider value={{ user, setUser}}>
            { children }
        </UserContext.Provider>
    )
}


