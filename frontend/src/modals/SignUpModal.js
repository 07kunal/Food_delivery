import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import './modal.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../action/userActions';


function SignUpModal(props) {
    const { show, onHide } = props;
    const [defaultEye, setDefaultEye] = useState(true)
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userRegister = useSelector((state) => state.userRegister)


    const { loading, error, userInfo } = userRegister
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(register(name, email, password))

    }
    useEffect(() => {
        if (userInfo) {
            navigate('/')
            onHide()
        }
    }, [userInfo])

    return (
        <Modal
            {...props}
            // show={signUpShow}
            // onHide={() => setSignUpShow(false)}
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
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ marginBottom: "15px" }}

                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ marginBottom: "15px" }}

                        />


                    </Form.Group>

                    <Form.Group className="mb-3 passwordCheck" controlId="formBasicPassword" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type={defaultEye ? `password` : 'text'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ marginBottom: "15px" }}
                        />
                        <div >
                            {defaultEye ? <FaEyeSlash onClick={() => setDefaultEye(false)} className="eyebtn" /> : <FaEye onClick={() => setDefaultEye(true)} className="eyebtn" />}
                        </div>
                    </Form.Group>

                    <Button variant="danger" type="submit">
                        Submit
                    </Button>
                </Form>

            </Modal.Body>

        </Modal>
    )
}

export default SignUpModal
