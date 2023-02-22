import { PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS ,LIST_ORDER_FAIL,LIST_ORDER_REQUEST,LIST_ORDER_SUCCESS} from "../constants/orderConstant";

export const placeOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case PLACE_ORDER_REQUEST:
            return { loading: true };
        case PLACE_ORDER_SUCCESS:
            return { loading: false, success: true };
        case PLACE_ORDER_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}

export const orderListReducer = (state = { order: [] }, action) => {
    switch (action.type) {
        case LIST_ORDER_REQUEST:
            return { loading: true };
        case LIST_ORDER_SUCCESS:
            return { loading: false, order: action.payload };
        case LIST_ORDER_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};