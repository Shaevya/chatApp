import React from 'react'
import { ListGroup, Accordion } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'
import UserInfo from './UserInfo';

export default function Conversations() {
    const { conversations, selectConversationIndex } = useConversations();
    return (
        <>
        <div id='conversations-wrapper' className='d-flex flex-column flex-grow-1'>
            <UserInfo />
            <div id='conversations-list'>
                <ListGroup variant='flush'>
                    {
                        conversations.map((conversation, index) => {
                            const isGroup = conversation && conversation.hasOwnProperty('groupName') && conversation.groupName !== '';
                            return (
                                !isGroup ?
                                <ListGroup.Item 
                                        key={index}
                                        action
                                        onClick={() => selectConversationIndex(index) }
                                        active={conversation.selected}
                                    >
                                        { conversation.recipients.map( r => r.name).join(', ') }
                                </ListGroup.Item>
                                :
                                <>
                                    <ListGroup.Item key={index}>
                                        <Accordion>
                                            <Accordion.Item eventKey={index}>
                                                <Accordion.Header onClick={() => selectConversationIndex(index) }>
                                                    {
                                                        conversation && conversation.hasOwnProperty('groupName') ? 
                                                        conversation.groupName :
                                                         `Group${index+1}`
                                                    }
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <ListGroup variant='flush'>
                                                        { conversation.recipients.map( (r,i) => 
                                                            <ListGroup.Item 
                                                                key={`${index}${i}`}
                                                                action
                                                                onClick={() => selectConversationIndex(index) }
                                                                active={conversation.selected}
                                                            >
                                                                {r.name}
                                                            </ListGroup.Item>
                                                        )}
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </ListGroup.Item>
                                </>
                        )})
                    }
                </ListGroup>
            </div>
        </div>
        
        </>
    )
}
