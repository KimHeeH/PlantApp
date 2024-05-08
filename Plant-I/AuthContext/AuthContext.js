import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

    const login = async () => {
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
            const parseUser = JSON.parse(savedUser);
            if(parseUser.id) {
                setUser(parseUser);
            }
        }
    };

    useEffect(() => {
        login();
    }, []);
    
    return (
        <UserContext.Provider value = {{ user, login }}>
            { children }
        </UserContext.Provider>
    )
};

export default UserProvider;