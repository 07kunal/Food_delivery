import React from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa'
import Loader from '../../component/Loader';
import { deleteCart } from '../../action/cartActions';
import UpdateModal from '../../modals/UpdateModal';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Checkout from '../checkout/Checkout';






function Carts() {
  const cartList = useSelector((state) => state.cartList);
  const { loading, cart, error } = cartList;
  const [selectedcartid, setSelectedcartid] = useState('')
  const [cartdata, setcartdata] = useState()
  const [price, setPrice] = useState('')
  const dispatch = useDispatch()
  const cartDelete = useSelector((state) => state.cartDelete)
  const [modalShow, setModalShow] = React.useState(false);
  const deleteHandler = (pizza_id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCart(pizza_id))
    }
    console.log(pizza_id);


  }
  const getCartTotal = cart?.reduce((acc, cartItem) => acc + parseInt(cartItem.price),
    50
  );
  // console.log(cart);
  return (
    <div className="mainCart">
      {loading && <Loader />}
      {/* {loadingDelete && <Loader />} */}

      <div className="container subContainer">
        <div className="row flex-container">
          <div className="col-md-8">
            <div className="heading">
              <h1>My Cart</h1>
            </div>
            {cart?.reverse().map((cartItem, index) => {
              return <>
                <UpdateModal
                  show={modalShow}
                  onHide={() => { setModalShow(false); setcartdata(""); setPrice('') }}
                  selectedcartid={selectedcartid}
                  cartdata={cartdata}
                  setcartdata={setcartdata}
                  price={price}
                  setPrice={setPrice}

                />
                <div className="cart-a " key={index}>
                  <div className="detail">
                    <h2>{cartItem.pizza_name}     <span className='varientSize'>[{cartItem?.variant}]</span></h2>
                    <span>Price: {cartItem?.quantity}*{cartItem?.prices[0][cartItem.variant]} = ₹{cartItem?.price}</span>
                    {/* <span>Quantity: {cartItem?.quantity}</span> */}
                    <div className="icon">
                      <MdDelete className='iconMd' onClick={() => deleteHandler(cartItem?._id)} />
                      <FaEdit className='iconFa' onClick={() => { setModalShow(true); setSelectedcartid(cartItem?._id) }} />
                    </div>
                  </div>
                  <div className="pizzaImage">
                    <img src={cartItem?.image_url} alt={cartItem.pizza_name} />

                  </div>

                </div>
                <hr />
              </>
            })}
          </div>
          <div className="col-md-4">
            <div className="mainAmount">
              <div className='charges' >
                <span>DELIVERY CHARGE:</span> <span>₹50/-</span>

              </div>
              <div className="charges">

                <span >Total Amount To Pay: </span> <span className='amountDiv'>₹{`${getCartTotal }`}/-</span>
              </div>
              {/* <div className="btn_button">
                <Button variant='danger'>
                  Check Out
                </Button>
              </div> */}
              <Checkout getCartTotal={getCartTotal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carts