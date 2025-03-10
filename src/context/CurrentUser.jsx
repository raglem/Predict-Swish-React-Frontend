import { USERNAME } from "../constants";
import { useState, createContext } from "react";

export const UserContext = createContext('')
export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState(localStorage.getItem(USERNAME) || '')
    const setUser = (newUsername) => {
        localStorage.setItem(USERNAME, newUsername)
        setUsername(newUsername)
    }
    return (
        <UserContext.Provider value={{ user: username, setUser}}>
            { children }
        </UserContext.Provider>
    )
}


