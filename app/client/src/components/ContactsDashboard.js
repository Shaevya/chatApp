import React, {useState} from 'react'
import {Button, ListGroup } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import NewContactsModal from './NewContactsModal'
import { Modal } from 'react-bootstrap'
import Contacts from './Contacts';

export default function ContactsDashboard() {
    const { contacts } = useContacts();
    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <>
            <div id='contacts-dashboard'>
                <Contacts/>
                <Button className='rounded-0' onClick={() => setModalOpen(true)}>
                    New Contact
                </Button>
                <Modal show={modalOpen} onHide={closeModal}>
                    <NewContactsModal closeModal={closeModal}/>
                </Modal>
            </div>
        </>
    )
}
