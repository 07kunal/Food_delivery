import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderAction } from '../../action/orderAction'
import Loader from '../../component/Loader';
import Moment from 'react-moment';
import './style.css';



function Orders() {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const listOrder = useSelector((state) => state.listOrder)
  const { order, loading } = listOrder
  const userInfo = userLogin
  useEffect(() => {
    dispatch(listOrderAction())

  }, [dispatch, userInfo])

  console.log(order)

  return (
    <>
      <div className=" heading"><h1>MY ORDERS</h1></div>
      {loading && <Loader />}
      {
        order?.length > 0 ? [...order]?.reverse().map((item, id) => {
          return <>
            <div className="container mainOrder" key={item?._id}>
              <div className="row subOrder">
                <div className="col-md-10">
                  <div className="row">
                    <div className="col-md-4">
                      <h4>Items ({item?.orderItem?.length})</h4>
                      {item?.orderItem?.map((orderDetail, index) => {
                        return <div className='item'>
                          <p key={index} className="itemList">
                            {orderDetail?.pizza_name} [{orderDetail?.variant}]
                          </p>
                          <span>Price: {orderDetail?.quantity}*{orderDetail?.prices[0][orderDetail?.variant]}= ₹{orderDetail?.price} </span>
                        </div>


                      })}

                    </div>
                    <div className="col-md-4">
                      <h4>Address</h4>
                      <p className='itemAddress'>{item?.shipping_address?.street},{item?.shipping_address?.city},{item?.shipping_address?.postal_code},</p>

                    </div>
                    <div className="col-md-4 itemPayment">
                      <p>Total Amount: ₹{item?.order_amount}/-</p>
                      <p>Order status: {item?.isDelivered ? "Placed" : "To be placed soon"}</p>
                      <p>Order on : <Moment format="DD/MM/YYYY">
                        {item?.createdAt}
                      </Moment> </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        }) : <div className="noOrder">
          <h1>No order to show</h1>
        </div>

      }
    </>
  )
}

export default Orders