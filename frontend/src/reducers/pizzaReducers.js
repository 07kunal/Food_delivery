import { GET_PIZZA_FAIL, GET_PIZZA_REQUEST, GET_PIZZA_SUCCESS } from "../constants/pizzaConstant";

export const getPizzaReducer = (state = {} , action) => {
    switch (action.type) {
        case GET_PIZZA_REQUEST:
            return { loading: true };
        case GET_PIZZA_SUCCESS:
            return { loading: false, pizzaDatas: action.payload }
        case GET_PIZZA_FAIL:
            return { loading: false, error: action.payload }



        default:
            return state;
    }
}