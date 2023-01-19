import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import './modal.css'


function SignUpModal(props) {
    const [defaultEye, setDefaultEye] = useState(true)
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Register
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />

                    </Form.Group>

                    <Form.Group className="mb-3 passwordCheck" controlId="formBasicPassword" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type={defaultEye ? `password` : 'text'}
                            placeholder="Password"

                        />
                        <div >
                            {defaultEye ? <FaEyeSlash onClick={() => setDefaultEye(false)} className="eyebtn" /> : <FaEye onClick={() => setDefaultEye(true)} className="eyebtn" />}
                        </div>
                    </Form.Group>

                    <Button variant="danger"type="submit">
                        Submit
                    </Button>
                </Form>

            </Modal.Body>

        </Modal>
    )
}

export default SignUpModal
