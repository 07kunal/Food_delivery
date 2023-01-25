import axios from "axios"
import { CREATE_CART_FAIL, CREATE_CART_REQUEST, CREATE_CART_SUCCESS, CART_LIST_FAIL, CART_LIST_REQUEST, CART_LIST_SUCCESS, CART_DELETE_FAIL, CART_DELETE_REQUEST, CART_DELETE_SUCCESS, CART_UPDATE_FAIL, CART_UPDATE_REQUEST, CART_UPDATE_SUCCESS, } from "../constants/cartConstant"



export const createToCartAction = (pizza_name, quantity, variant, image_url, prices, price) => async (dispatch, getState) => {
    const API_URL = '/api/cart'

    try {
        dispatch({
            type: CREATE_CART_REQUEST
        })
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(API_URL, { pizza_name, quantity, variant, image_url, prices, price }, config);

        if (data) {

            dispatch({
                type: CREATE_CART_SUCCESS,
                payload: data
            })
            dispatch(listCart())
        }

    } catch (error) {
        const message = error.response?.data?.message ? error.response?.data?.message : error.message;
        dispatch({
            type: CREATE_CART_FAIL,
            payload: message,
        })

    }
}

// get cartList

export const listCart = () => async (dispach, getState) => {
    const API_URL = '/api/cart'


    try {
        dispach({ type: CART_LIST_REQUEST })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(API_URL, config);
        if (data) {
            dispach({
                type: CART_LIST_SUCCESS, payload: data
            })
        }

    } catch (error) {
        const message = error.response?.data?.message ? error.response?.data?.message : error.message;
        dispach({
            type: CART_LIST_FAIL,
            payload: message,
        })

    }
}

// delete cart
export const deleteCart = (pizza_id) => async (dispatch, getState) => {
    const API_URL = '/api/cart/'

    try {

        dispatch({ type: CART_DELETE_REQUEST })
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // console.log(config)
        const { data } = await axios.delete(API_URL + `${pizza_id}`, config)

        if (data) {
            dispatch({
                type: CART_DELETE_SUCCESS,
                payload: data
            })
            dispatch(listCart())

        }


    } catch (error) {
        const message = error.response?.data?.message ? error.response?.data?.message : error.message;
        dispatch({
            type: CART_DELETE_FAIL,
            payload: message
        })
    }


}
// cart update 
export const updateCart = (pizza_id, quantity, varient, price) => async (dispatch, getState) => {
    const API_URL = "/api/cart/"

    try {
        dispatch({ type: CART_UPDATE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(API_URL + `${pizza_id}`, { quantity, varient, price }, config)
        if (data) {
            dispatch({ type: CART_UPDATE_SUCCESS, payload: data })
            dispatch(listCart())

        }

    } catch (error) {
        const message = error.response?.data?.message ? error.response?.data?.message : error.message;
        dispatch({
            type: CART_UPDATE_FAIL,
            payload: message
        })
    }

}