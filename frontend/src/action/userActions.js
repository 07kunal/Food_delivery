import axios from 'axios'
import { toast } from 'react-toastify'
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS
} from '../constants/userConstant'

export const register = (name, email, password) => async (dispatch) => {
    const API_URL = '/api/users'
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const config = {
            headers: {
                "Content-type": "application/json"

            }
        }

        const response = await axios.post(API_URL, { name, email, password }, config)
        if (response?.data) {
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: response?.data
            })
            dispatch({type:USER_LOGIN_SUCCESS,payload:response?.data})
            localStorage.setItem("userInfo", JSON.stringify(response?.data))

        }

    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.response?.data?.message ? error.response?.data?.message : error.messgage })
    }
}

export const login = (email, password) => async (dispatch) => {
    const API_URL = '/api/users'

    try {

        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        };
        const response = await axios.post(API_URL + "/login", {
            email, password
        }, config)

        // console.log(response.data)
        if (response?.data) {
            dispatch({ type: USER_LOGIN_SUCCESS, payload: response?.data })
            
            localStorage.setItem("userInfo", JSON.stringify(response?.data))
        }
        // setIsLoading(false)



    } catch (error) {
        // dispatch({ type: USER_LOGIN_FAIL, payload: error.response?.data?.message ? error.response?.data?.message : error.message })
        const message = error.response?.data?.message ? error.response?.data?.message : error.message;
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: message,
        })
        toast.error(message)


    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT })
}