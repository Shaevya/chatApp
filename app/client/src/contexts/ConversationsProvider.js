import React, { useContext, useEffect, useState, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from '../contexts/ContactsProvider'
import { useSocket } from '../contexts/SocketProvider'
import { useUserInfo } from './UserInfoProvider';

const ConversationsContext = React.createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {

    const [conversations, setConversations] = useLocalStorage('conversations', []);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
    const { contacts } = useContacts();
    const { socket } = useSocket();
    const { id } = useUserInfo();

    function createConversation(recipients, groupName) {
        if(recipients && recipients.length === 0) return;
        setConversations(prevConversations => {
            return [...prevConversations, { recipients, messages: [], groupName }]
        }) 
    }
 
    const addMessageToConversation = useCallback(
        ({recipients, picture, text, sender, groupName}) => {
        
        setConversations(prevConversations => { 
            let madeChange = false;
            const newMessage = { sender, picture, text };
            const newConversations = prevConversations.map
            (conversation => {
                if(arrayEquality(conversation.recipients, recipients)){
                    madeChange = true;
                    return {
                        ...conversation,
                        groupName,
                        messages: [...conversation.messages, newMessage]
                    }
                }

                return conversation;
            })

            if(madeChange){
                return newConversations;
            }else{
                return [...prevConversations, { recipients, groupName, messages: [newMessage]}]
            }

        });
    },[setConversations])

    useEffect(() => {
        if(socket == null) return;

        socket.on('receive-message', addMessageToConversation);

        return () => socket.off('receive-message');

    }, [socket, addMessageToConversation]);

    function sendMessage(recipients, picture, text, groupName){

        socket.emit('send-message', { recipients, picture, text, groupName });

        addMessageToConversation({recipients, picture, text, sender: id, groupName })
    }

    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map( recipientId => {
            const contact = contacts.find(contact => contact.id === recipientId);
            const name = contact?.name || recipientId;
            return {
                id: recipientId,
                name: name
            }
        });

        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => contact.id === message.sender);
            const name = contact?.name || message.sender;
            const fromMe = id === message.sender;
            return {
                ...message, 
                senderName: name,
                fromMe
            }
        })

        const selected = index === selectedConversationIndex;
        
        return { ...conversation, messages, recipients, selected };
    });

    const value = { 
        conversations : formattedConversations, 
        selectedConversation: formattedConversations[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
        createConversation,
        sendMessage
    };

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    ) 
}

function arrayEquality(a, b) {

    if(a.length !== b.length) return false;

    a.sort();
    b.sort();

    return a.every((element, index) => {
        return element === b[index];
    })
}