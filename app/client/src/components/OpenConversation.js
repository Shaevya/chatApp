import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';

export default function OpenConversation() {

    const [text, setText] = useState('');
    const { sendMessage, selectedConversation } = useConversations();
    const setRef = useCallback(node => {
        if(node) {
            node.scrollIntoView({ smooth: true });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        sendMessage(selectedConversation.recipients.map( r => r.id), text);
        setText('');
    }

    return (
        <div className='d-flex flex-column flex-grow-1'>
            <div className='flex-grow-1 overflow-auto'>
                <div className='d-flex flex-column align-items-start justify-content-end px-3'>
                    {
                        selectedConversation.messages.map((message, index) => {
                            const lastMessage = selectedConversation.messages.length - 1 === index;  
                            return (
                                <div 
                                    ref={ lastMessage ? setRef : null }
                                    key={index} 
                                    className={`my-1 d-flex flex-column ${message.fromMe ? 
                                        'align-self-end align-items-end' : 'align-items-start'}`} >
                                    <div 
                                    className={`rounded px-2 py-1 text-white ${message.fromMe ? 'bg-primary ' : 'bg-secondary'}`}>
                                        {message.text}
                                    </div>
                                    <div className={`text-muted small ${message.fromMe ? 'text-sm-end' : 'text-sm-start'}`}>
                                        {message.fromMe ? 'You' : message.senderName}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <InputGroup>
                        <Form.Control
                         as="textarea"
                         value={text}
                         onChange={ e => setText(e.target.value) }
                         onKeyDown ={ e => e.key === 'Enter' && handleSubmit(e)}
                         style={{height: '75px', resize: 'none'}}
                         required
                        />
                        <Button type='submit'>Send</Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}