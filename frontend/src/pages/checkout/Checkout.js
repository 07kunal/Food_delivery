import React from 'react'
import { Button } from 'react-bootstrap'
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { placeOrderAction } from '../../action/orderAction';

function Checkout(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { getCartTotal } = props
    const stripePublicKey = "pk_test_51MU6GsSFlUOCoafXw4ov9X6dgy4gCpVMa0TXOqPF9sVgvOdmHYJ1BpEJ0pBn8wen17C5D7BP3iHLGDIhIna8X2IL005EfmAhhF";
    const tokenHandler = (token) => {
        dispatch(placeOrderAction(token, getCartTotal))
        console.log(token)
    }
    const finalCheckout = () => {
        toast.success('Order Placed successfully')
        navigate('/orders')
    }


    return (
        <>
            <StripeCheckout
                stripeKey={stripePublicKey}
                amount={getCartTotal * 100}
                shippingAddress
                token={tokenHandler}
                currency='INR'
                closed={finalCheckout}
            >
                <div className="btn_button">
                    <Button variant='danger'>
                        Pay Now
                    </Button>
                </div>
            </StripeCheckout>
        </>
    )
}

export default Checkout