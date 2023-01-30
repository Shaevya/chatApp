import React, { useContext, useEffect, useRef, useState, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { generateRandomAvatarOptions } from '../components/RandomAvatars'
import { useSocket } from './SocketProvider';

const UserInfoContext = React.createContext();

export function useUserInfo(){
    return useContext(UserInfoContext);
}

const DEFAULT_USER_TEMPLATE = {
    id: null,
    name: 'Unknown User',
    designation: 'NA',
    picture: generateRandomAvatarOptions()
}

export function UserInfoProvider({ children }) {
    const { socket, id, setId } = useSocket();
    const [user, setUser] = useLocalStorage('user', DEFAULT_USER_TEMPLATE);
    const [isUserValid, setIsUserValid] = useState(true);

    useEffect(() => {
        if(socket == null) return;

        socket.on('confirm-login', ({...args}) => validateUserCredentials({...args}));

        return () => socket.off('confirm-login');

    }, [socket]);

    

    const createUserProfile = (emailId, name, designation, picture) => {
        const _user = {
            id: id,
            emailId: emailId,
            name: name || 'Unknown User',
            designation: designation || 'NA',
            picture: picture ? {...picture} : generateRandomAvatarOptions()
        }

        socket.emit('save-user', JSON.stringify(_user), ({status, message}) => {
            console.log(status ? "saved successfully" : "saving failed")
            console.log("message: " + message)
        });

        setUser(_user);
    }

    const getUserProfile = (emailId) => {
        socket.emit('login', emailId);
    }

    const validateUserCredentials = ({...userDetails}) => {

        const {id, emailId, name, designation, picture} = userDetails;
        if(!emailId) { 
            setIsUserValid(false);
            return;
        }
        setUser(userDetails);
    }

    const value = {
        id: user.id,
        user,
        setId: setId,
        picture: user.picture ||  generateRandomAvatarOptions(),
        createUserProfile: createUserProfile,
        getUserProfile,
        isUserValid
    }
    
    return (
        <UserInfoContext.Provider value={value}>
            {children}
        </UserInfoContext.Provider>
    ) 
}
