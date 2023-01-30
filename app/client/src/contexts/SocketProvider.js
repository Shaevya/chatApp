import React, { useContext, useState, useEffect } from 'react'
import io from 'socket.io-client';
import { v4 as uuid } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext);
} 

export function SocketProvider({ children }) {
    const [user, setSocketProviderUser] = useState({id: null});
    const [id, setId] = useLocalStorage('id', null);
    const [socket, setSocket] = useState();

    useEffect(() => {
        setId(uuid());
    }, []);

    useEffect(() => {
        
        if(!id) return;

        const newSocket = io(
            'http://localhost:5000',
            { 
                query : 
                {
                    id: id,
                    emailId: user?.id,
                    name: user?.name,
                    designation: user?.designation,
                    picture: user && user.picture ? JSON.stringify(user.picture) : null
                }
            }
        );
        setSocket(newSocket);

        return () => newSocket.close();

    }, [id]);

    const value = {
        socket,
        setSocketProviderUser,
        id,
        setId
    }

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}
