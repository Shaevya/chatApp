import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuid } from 'uuid'

export default function Login({ onIdSubmit }) {
    const idref = useRef();

    const handleSubmit = (e) =>{
        e.preventDefault();
        onIdSubmit(idref.current.value);
    }

    const createNewId = () => {
        onIdSubmit(uuid());
    }

    return (
        <Container className='align-items-center d-flex' style={{height: '100vh'}}>
            <Form onSubmit={handleSubmit} className='w-100'>
                <Form.Group>
                    <Form.Label>Enter Your Id</Form.Label>
                    <Form.Control type='text' ref={idref} />
                </Form.Group>
                <Button type='submit' className='me-2'>Login</Button>
                <Button onClick={createNewId} variant='secondary'>Create A New Id</Button>
            </Form>
        </Container>
    )
}
