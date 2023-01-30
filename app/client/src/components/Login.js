import React, { useEffect, useRef, useState } from 'react'
import { Container, Form, Button, Modal,FormControl } from 'react-bootstrap'
import { v4 as uuid } from 'uuid';
import { useUserInfo } from '../contexts/UserInfoProvider'
import NewUserModal from './NewUserModal';

export default function Login() {
    const idref = useRef();
    const passref = useRef();
    const { getUserProfile, isUserValid, user } = useUserInfo();
    const [showRegisterModal, setShowRegisterModal] = useState();

    useEffect(() => {
        console.log("UserId : " + user.id);
    }, [user.id])

    const handleSubmit = (e) =>{
        e.preventDefault();
        getUserProfile(idref.current.value);
    }

    const closeModal = () => {
        setShowRegisterModal(false);
    }

    const createNewUser = () => {
        setShowRegisterModal(true);
    }

    return (
        <Container className='align-items-center d-flex' style={{height: '100vh'}}>
            <Form onSubmit={handleSubmit} className='w-100'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"  
                        ref={idref}
                        isInvalid={!isUserValid}
                    />
                    {
                        idref?.current?.value && idref?.current?.value != '' ?
                        <>
                            <FormControl.Feedback type='valid'>
                                <div>Valid EmailId</div>
                                </FormControl.Feedback>
                            <FormControl.Feedback type='invalid'>
                                <div>EmailId does not exist!</div>
                            </FormControl.Feedback>
                        </>: null
                    }
                    
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        ref={passref}
                    />
                </Form.Group>
                {/* <Form.Group>
                    <Form.Label>Enter Your Id</Form.Label><Form.Control type='text' ref={idref} />
                    <Form.Label>Enter Your Name</Form.Label><Form.Control type='text' ref={nameref} />
                    <Form.Label>Enter Your Name</Form.Label><Form.Control type='text' ref={nameref} />
                </Form.Group> */}
                <Button type='submit' className='me-2'>Login</Button>
                <Button onClick={createNewUser} variant='secondary'>Register</Button>
            </Form>
            <Modal show={showRegisterModal} onHide={closeModal}>
                <NewUserModal closeModal={closeModal}/>
            </Modal>
        </Container>
    )
}
