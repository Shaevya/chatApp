import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Form }  from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'

const CONVERSATION_TYPE = {
    INDIVIDUAL: 'Individual',
    GROUP: 'Group'
}

export default function NewConversationModal({ modalOpen, closeModal }) {
    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const { contacts } = useContacts();
    const { createConversation } = useConversations();
    const [selectedConversationType, setSelectedConversationType] = useState(CONVERSATION_TYPE.INDIVIDUAL);
    const groupNameRef = useRef('');
    
    useEffect(() => {
        setSelectedConversationType(CONVERSATION_TYPE.INDIVIDUAL);
    }, []);

    const handleCheckboxChange = (contactId) => {
        setSelectedContactIds(prevSelectedContactIds => {
            if(prevSelectedContactIds.includes(contactId)){
                return prevSelectedContactIds.filter(id => id !== contactId);
            }else{
                return [...prevSelectedContactIds, contactId];
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const groupName = groupNameRef.current.value;
        createConversation(selectedContactIds, groupName);
        closeModal();
    }

    const updateConversationType = (e) => {
        //e.preventDefault();
        if(e.target.id === CONVERSATION_TYPE.INDIVIDUAL){
            groupNameRef.current.value = '';
        }
        setSelectedConversationType(e.target.id);
    }

    return (
        <>
            <Modal show={modalOpen} onHide={closeModal} centered='true' dialogClassName='create-conversation-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Create Conversation</Modal.Title>
                </Modal.Header>
                <Modal.Body id='new-conversation-content'>
                    <Form>
                        <div id='coversation-type-wrapper'>
                            <Form.Check 
                                title='Createa an Individual Conversation'
                                id={CONVERSATION_TYPE.INDIVIDUAL} 
                                inline 
                                label={CONVERSATION_TYPE.INDIVIDUAL} 
                                name="conversation-type" 
                                type='radio' 
                                defaultChecked='true'
                                onClick={updateConversationType}
                            />
                            <Form.Check 
                                title='Create an Group Conversation'
                                id={CONVERSATION_TYPE.GROUP} 
                                inline 
                                label={CONVERSATION_TYPE.GROUP} 
                                name="conversation-type" 
                                type='radio' 
                                onClick={updateConversationType}
                            />
                        </div>
                        <div id='saved-contacts-wrapper'>
                            <Form.Group className="mb-3" controlId="formGroupName">
                                <Form.Control 
                                    ref={groupNameRef}
                                    type="input" 
                                    disabled={selectedConversationType == CONVERSATION_TYPE.INDIVIDUAL}
                                    placeholder="Enter Group Name" />
                            </Form.Group>
                            {contacts.map(contact => (
                                <Form.Group controlId={contact.id} key={contact.id}>
                                    <Form.Check
                                        type="checkbox"
                                        value={selectedContactIds.includes(contact.id)}
                                        label={contact.name}
                                        onChange={() => handleCheckboxChange(contact.id)}
                                    />
                                </Form.Group>
                            ))}
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                    type='button'
                    variant='primary' 
                    disabled={(selectedConversationType == CONVERSATION_TYPE.INDIVIDUAL && selectedContactIds && selectedContactIds.length === 0) || 
                            (selectedConversationType == CONVERSATION_TYPE.GROUP && 
                            (selectedContactIds && selectedContactIds.length === 0 || groupNameRef?.current?.value === ''))}
                    onClick={handleSubmit}>
                            Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
