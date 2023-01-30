import React, { useState } from 'react'
import Conversations from './Conversations'
import OpenConversation from './OpenConversation';
import { useConversations } from '../contexts/ConversationsProvider'
import { Modal, Button } from 'react-bootstrap'
import NewConversationModal from './NewConversationModal'

export default function ChatDashboad() {
    const { selectedConversation } = useConversations();
    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    }

    

    return (
        <>
            <div id='chat-dashboard'>
                <div id='user-contacts-wrapper'>
                    <Conversations/>
                </div>
                <div id='chats-wrapper'>
                    {selectedConversation && <OpenConversation/>}
                </div>
                <div id='info-wrapper'>
                    <Button className='rounded-0' onClick={() => setModalOpen(true)}>
                        New Conversation
                    </Button>
                    <NewConversationModal modalOpen={modalOpen} closeModal={closeModal}/>
                </div>
            </div>
        </>
    )
}
