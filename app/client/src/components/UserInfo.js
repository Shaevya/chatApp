import React, { useState } from 'react'
import { Image } from 'react-bootstrap';
import { RiChatSmile3Line } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { useUserInfo } from '../contexts/UserInfoProvider';
import { RandomAvatars } from './RandomAvatars'

export default function UserInfo() {
    const { user } = useUserInfo();
    const [status, setStatus] = useState(true);

    return (
        <div id='user-info-layout'>
            <div id='quick-chat-wrapper'>
                <span>
                    <RiChatSmile3Line />
                </span>&nbsp;
                <label>QuickChat</label>
            </div>
            <div id='user-info-wrapper'>
                <div id='user-info'>
                    <div className='pic rounded-circle'>
                        <RandomAvatars avatarProps={user.picture}/>
                    </div>
                    <div className='pb-0'>
                        <label>{user.name}</label>
                        <span className='ms-2'>
                            <FiSettings size='1em'/>
                        </span>
                    </div>
                    <span className='designation text-muted'>{user.designation}</span>
                    <span className='activity' onClick={() => setStatus(!status)}>
                        {
                            status ? 
                            <BsToggleOn color='blue' size='1em'/> :
                            <BsToggleOff color='blue' size='1em'/>
                        }
                        <label className='ms-1'>
                            {status ? 'active' : 'inactive'}
                        </label>
                    </span>
                </div>
            </div>
        </div>
    )
}
