import axios from "axios";
import { PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS, LIST_ORDER_REQUEST, LIST_ORDER_SUCCESS, LIST_ORDER_FAIL } from "../constants/orderConstant";


export const placeOrderAction = (tokenPayment, getCartTotal) => async (dispatch, getState) => {
    const API_URL = '/api/order'
    try {
        dispatch({ type: PLACE_ORDER_REQUEST })
        const { userLogin: { userInfo } } = getState();
        const { cartList: { cart } } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(API_URL, { tokenPayment, getCartTotal, cart }, config);
        if (data) {
            dispatch({
                type: PLACE_ORDER_SUCCESS,
            })
            dispatch(listOrderAction())
            console.log(data);
        }
    } catch (error) {
        const message = error.response?.data?.message ? error.response?.data?.message : error.message;
        dispatch({
            type: PLACE_ORDER_FAIL,
            payload: message,
        })
    }
}

export const listOrderAction = () => async (dispatch, getState) => {
    const API_URL = '/api/order'
    try {
        dispatch({ type: LIST_ORDER_REQUEST })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(API_URL, config)
        if (data) {
            dispatch({
                type: LIST_ORDER_SUCCESS, payload: data
            })
        }

    } catch (error) {
        const message = error.response?.data?.message ? error.response?.data?.message : error.message;
        dispatch({
            type: LIST_ORDER_FAIL,
            payload: message,
        })
    }
}