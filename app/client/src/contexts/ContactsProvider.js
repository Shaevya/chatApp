import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { useSocket } from './SocketProvider';

const ContactsContext = React.createContext();

export function useContacts(){
    return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {

    const [contacts, setContacts] = useLocalStorage('contacts', []);
    const { socket } = useSocket();

    function createContact(id, name) {
        getUserById(id, (picture) => {
            setContacts(prevContacts => {
                return [...prevContacts, {id, name, picture}]
            })
        });
        
    }

    function getUserById(id, cb){
        socket.emit('get-user-by-id', id, (user) => {
            console.log(JSON.stringify(user));
            const {id, name, designation, emailId, picture } = user;
            if(cb) {
                let pic = picture ? picture : [];
                cb(pic);
            }
        });
    }


    return (
        <ContactsContext.Provider value={{ contacts, createContact }}>
            {children}
        </ContactsContext.Provider>
    ) 
}
