import React, { useRef, useState } from 'react'
import { Modal, Button, Form }  from 'react-bootstrap'
import { useUserInfo } from '../contexts/UserInfoProvider';
import { RandomAvatars, generateRandomAvatarOptions } from './RandomAvatars';

const PIC_SIZE ='9em';

export default function NewUserModal({ closeModal }) {

    const [avatarPic, setAvatarPic] = useState(generateRandomAvatarOptions());
    const emailIdRef = useRef();
    const nameRef = useRef();
    const designationRef = useRef();
    const { createUserProfile } = useUserInfo();

    const handleSubmit = (e) => {
        e.preventDefault();
        createUserProfile(emailIdRef.current.value, nameRef.current.value, designationRef.current.value, avatarPic);
        closeModal();
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Create User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id='create-user-modal-wrapper'>
                    <div className='create-user-modal-info'>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' ref={emailIdRef} required/>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' ref={nameRef} required/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Designation</Form.Label>
                                <Form.Control type='text' ref={designationRef} required/>
                            </Form.Group>
                            <Button type='submit' className='mt-4'>Create</Button>
                        </Form>
                    </div>
                    <div className='create-user-modal-pic' title='Click for next avatar' onClick={() => setAvatarPic(generateRandomAvatarOptions())}>
                        <div className='pic rounded-circle'>
                            <RandomAvatars height={PIC_SIZE} width={PIC_SIZE} avatarProps={avatarPic}/>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </>
    )
}
