import React, { useContext, useState, useEffect } from 'react'
import io from 'socket.io-client';
import { useUserInfo } from './UserInfoProvider';
const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext);
} 

export function SocketProvider({ children }) {
    const { id } = useUserInfo();
    const [socket, setSocket] = useState();

    useEffect(() => {
        const newSocket = io(
            'http://localhost:5000',
            { query : { id }}
            );
        setSocket(newSocket);

        return () => newSocket.close();
    }, [id]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
