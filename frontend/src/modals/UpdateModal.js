import React from 'react'
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../component/Loader';
import { updateCart } from '../action/cartActions';


function UpdateModal(props) {
    const { selectedcartid, cartdata, setcartdata, price, setPrice, onHide } = props
    const dispatch = useDispatch()
    const dataFetchedRef = useRef(false);
    const [quantity, setQuantity] = useState('')
    const [variant, setVariant] = useState('')
    const [loadingByid, setLoadingByid] = useState(false)
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const cartUpdate = useSelector((state) => state.cartUpdate)
    const { loading, error } = cartUpdate

    const fetchCartById = async () => {

        const API_URL = '/api/cart/'
        setLoadingByid(true)
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(API_URL + `${selectedcartid}`, config)
        if (data) {
            setLoadingByid(false)
            setcartdata(data)
            setQuantity(data.quantity)
            setVariant(data.variant)

        }

    }

    useEffect(() => {

        dataFetchedRef.current = true;
        if (selectedcartid) {
            fetchCartById()
        }
    }, [selectedcartid])
    useEffect(() => {
        setPrice(cartdata && cartdata.prices && cartdata.prices[0][variant] * quantity);

    }, [cartdata, variant, quantity]);


    const updateHandler = (e) => {
        e.preventDefault();
        if (!quantity || !variant || !price) {
            return toast.error('please include all field ')
        }
        dispatch(updateCart(selectedcartid, quantity, variant, price))
        onHide()
    }

    console.log(price)

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {loading && <Loader />}
            {loadingByid ? <Loader /> : <>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2>{cartdata?.pizza_name}</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={updateHandler} >

                        <Form.Group controlId="title">
                            <Form.Label>quantity</Form.Label>

                            <Form.Select type="quantity" value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                style={{ marginBottom: "15px" }} >
                                {[...Array(10).keys()].map((x, i) => {
                                    return (
                                        <option value={i + 1} key={x}>
                                            {i + 1}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>variant</Form.Label>

                            <Form.Select value={variant}
                                onChange={(e) => setVariant(e.target.value)}
                                style={{ marginBottom: "15px" }}>
                                <option></option>
                                <option value="small">small</option>
                                <option value="medium">medium</option>
                                <option value="large">large</option>
                            </Form.Select>
                        </Form.Group>



                        <div className="price">
                            Price:₹ {cartdata && cartdata.prices && cartdata.prices[0][variant] * quantity}/-
                        </div>

                        {/* <Button variant='danger' type='submit'>Update</Button> */}
                        <Modal.Footer>
                            <Button variant='danger' type='submit'>Update</Button>
                        </Modal.Footer>
                    </Form>

                </Modal.Body>

            </>}
        </Modal>
    )
}

export default UpdateModal