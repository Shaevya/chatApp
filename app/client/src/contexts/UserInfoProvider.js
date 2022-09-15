import React, { useContext, useRef, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { generateRandomAvatarOptions } from '../components/RandomAvatars'

const UserInfoContext = React.createContext();

export function useUserInfo(){
    return useContext(UserInfoContext);
}

export function UserInfoProvider({ children }) {

    const [id, setId] = useLocalStorage('id', []);
    const value = {
        id: id,
        name: 'Bill Bradshaw',
        designation: 'Lead SDE',
        setId: setId,
        picture: generateRandomAvatarOptions()
    }
    
    return (
        <UserInfoContext.Provider value={value}>
            {children}
        </UserInfoContext.Provider>
    ) 
}
