import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import './modal.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../action/userActions';
import Loader from '../component/Loader'
import { toast } from 'react-toastify';
import SignUpModal from './SignUpModal';


function LoginModal(props) {
    const { show, onHide } = props;
    const [defaultEye, setDefaultEye] = useState(true)
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [SignUpShow, setSignUpShow] = useState(false);
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const handleSubmit = async (e) => {
        e.preventDefault()

        dispatch(login(email, password))


    }
    useEffect(() => {
        if (userInfo) {
            onHide()
            navigate('/')
        }

    }, [userInfo])
    return (
        <>
            <SignUpModal show={SignUpShow} onHide={() => setSignUpShow(false)} />
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Login
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && toast.error(error)}
                    {loading && <Loader />}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email}
                                onChange={(e) => setEmail(e.target.value)} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type={defaultEye ? `password` : 'text'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div >
                                {defaultEye ? <FaEyeSlash onClick={() => setDefaultEye(false)} className="eyebtn" /> : <FaEye onClick={() => setDefaultEye(true)} className="eyebtn" />}
                            </div>
                        </Form.Group>

                        <Button variant="danger" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <div className="new_user">
                        <p>New to Pizza's Club <span onClick={() => {
                            setSignUpShow(true);
                                onHide()
                        }}>Click Here</span></p>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default LoginModal
