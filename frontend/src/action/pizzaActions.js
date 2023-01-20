import { GET_PIZZA_FAIL, GET_PIZZA_REQUEST, GET_PIZZA_SUCCESS } from "../constants/pizzaConstant"
import axios from "axios"

export const getAllPizzas = () => async (dispatch) => {
    const API_URL = '/api/pizzas'
    try {
        dispatch({ type: GET_PIZZA_REQUEST })

        const { data } = await axios.get(API_URL)
        if (data) {
            dispatch({
                type: GET_PIZZA_SUCCESS, payload: data
            })
        }
    } catch (error) {
        const message = error.response?.data?.message ? error.response?.data?.message : error.message;
        dispatch({
            type: GET_PIZZA_FAIL,
            payload: message,
        })

    }

}