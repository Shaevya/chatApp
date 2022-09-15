import React from 'react'
import { useConversations } from '../contexts/ConversationsProvider'
import Sidemenu from './Sidemenu';
import OpenConversation from './OpenConversation'
import Sidebar from './Sidebar'
import Topbar from './Topbar';

export default function Dashboard() {
  return (
    <>
        <div id='dashboard' style={{ height: '100vh'}}>
            <Topbar />
            <Sidemenu />
            {/* <Sidebar id={id} />
            { selectedConversation && <OpenConversation />} */}
        </div>
    </>
  )
}
