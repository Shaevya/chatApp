import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';
import { MdSend, MdOutlineEmojiEmotions } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useUserInfo } from '../contexts/UserInfoProvider';
import { RandomAvatars } from './RandomAvatars'

const CHAT_PIC_SIZE ='30px';

export default function OpenConversation() {

    const [text, setText] = useState('');
    const { sendMessage, selectedConversation } = useConversations();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const inputRef = useRef();
    const { picture } = useUserInfo();

    const setRef = useCallback(node => {
        if(node) {
            node.scrollIntoView({ smooth: true });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        sendMessage(selectedConversation.recipients.map( r => r.id), picture, text, selectedConversation.groupName);
        setText('');
    }

    const addAttachments = (e) => {
        e.preventDefault();
        console.log('Attachments clicked');
    }

    const onEmojiClick = (e) => {
        let emoji = e.native;
        if(emoji == null) {
            let sym = e.unified.split('-')
            let codesArray = []
            sym.forEach(el => codesArray.push('0x' + el))
            emoji = String.fromCodePoint(...codesArray)
        }
        setText(prevText => prevText + emoji);
        setShowEmojiPicker(false);
        if(inputRef.current != null){
            inputRef.current.focus();
        }
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const userAvatar = (
        <span className='mx-2'>
            <RandomAvatars height={CHAT_PIC_SIZE} width={CHAT_PIC_SIZE} avatarProps={picture} />
        </span>
    );

    const getUserAvatar = (picInfo) =>{
        return (<span className='mx-2'>
                    <RandomAvatars height={CHAT_PIC_SIZE} width={CHAT_PIC_SIZE} avatarProps={picInfo} />
                </span>);
    }

    return (
        <div id='chats-layout-wrapper'>
            <div id='chats-layout'>
                {
                    selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index;  
                        return (
                            <div ref={ lastMessage ? setRef : null } key={index} className={`wt-80 my-2 mx-2 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`} >
                                <div className={`my-1 mx-2 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}>
                                    <span className={`small fw-bold ${message.fromMe ? 'text-sm-end' : 'text-sm-start'}`}>
                                        {message.fromMe ? 'You' : message.senderName}
                                    </span>
                                </div>
                                <div className='d-flex'>
                                    {
                                        !message.fromMe && getUserAvatar(message.picture)
                                    }
                                    <span className={`rounded px-2 py-1 ${message.fromMe ? 'bg-from-me text-white' : 'bg-from-you border'}`}>
                                        {message.text}
                                    </span>
                                    {
                                        message.fromMe && getUserAvatar(message.picture)
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='input-area'>
                <Form onSubmit={handleSubmit} style={{width: '100%'}}>
                    <Form.Group className='input-form m-2'>
                        <InputGroup>
                            <span className='attachment-icon'>
                                <input type="file" name="uploadfile" id="chat-attachment" style={{display:'none'}} onChange={(e) => addAttachments(e)}/>
                                <label htmlFor='chat-attachment'>
                                    <GrAttachment size='1em'/>
                                </label>
                            </span>
                            <Form.Control
                                as="textarea"
                                ref={inputRef}
                                value={text}
                                onChange={ e => setText(e.target.value) }
                                onKeyDown ={ e => e.key === 'Enter' && handleSubmit(e)}
                                className='rounded-3'
                                style={{height: '30px', resize: 'none'}}
                                required
                            />
                            <span className='emoji-icon'>
                                {showEmojiPicker && 
                                <span className='picker-wrapper'>
                                    <Picker data={data} onEmojiSelect={onEmojiClick}/>
                                </span>
                                }
                                <label onClick={toggleEmojiPicker}>
                                    <MdOutlineEmojiEmotions size='1.5em'/>
                                </label>
                            </span>
                            <Button type='submit' className='rounded-3 d-flex send-btn' >
                                <span>Send</span>
                                <span className='send-btn-icon'>
                                    <MdSend size='1em'/>
                                </span> 
                            </Button>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}
