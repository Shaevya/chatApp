import React , { useState }from 'react'
import { Tab, Nav } from 'react-bootstrap'
import '../styles/dashboard.css'
import { MdChat, MdContacts } from "react-icons/md";
import { IconContext } from 'react-icons'
import ChatDashboad from './ChatDashboad';
import ContactsDashboard from './ContactsDashboard';


const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts' 

export default function Sidemenu() {

    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
    const circleClasses = "inline-block p-7 rounded-full w-20 mx-auto";
    return (
        <>
            <div id='side-menu-wrapper'>
                <IconContext.Provider value={{ size: '2em' }}>
                    <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                        <div id='side-menu'>
                            <Nav variant='tabs'>
                                <Nav.Item>
                                    <Nav.Link eventKey={CONVERSATIONS_KEY}>
                                        <span className={circleClasses}>
                                            <MdChat style={{ color: activeKey == CONVERSATIONS_KEY ? '#5078bf' : '#343a40'}}/>
                                        </span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={CONTACTS_KEY}>
                                        <span className={circleClasses}>
                                            <MdContacts style={{ color: activeKey == CONTACTS_KEY ? '#5078bf' : '#343a40'}}/>
                                        </span>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <div id='content-wrapper'>
                            <div id='contents'>
                                {
                                    activeKey === CONVERSATIONS_KEY ? 
                                    <ChatDashboad /> : 
                                    <ContactsDashboard />
                                }
                                {/* <Tab.Content style={{ width: 'inherit', hei }}>
                                    <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                                        <ChatDashboad />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={CONTACTS_KEY}>
                                        <Contacts/>
                                    </Tab.Pane>
                                </Tab.Content> */}
                            </div>
                        </div>
                    </Tab.Container>
                </IconContext.Provider>
            </div>
        </>
    )
}
