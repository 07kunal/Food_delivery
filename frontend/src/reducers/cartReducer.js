import { CART_DELETE_FAIL, CART_DELETE_REQUEST, CART_DELETE_SUCCESS, CART_LIST_FAIL, CART_LIST_REQUEST, CART_LIST_SUCCESS, CART_UPDATE_FAIL, CART_UPDATE_REQUEST, CART_UPDATE_SUCCESS, CREATE_CART_FAIL, CREATE_CART_REQUEST, CREATE_CART_SUCCESS } from "../constants/cartConstant";


export const createCartReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_CART_REQUEST:
            return { loading: true };
        case CREATE_CART_SUCCESS:
            return { loading: false, success: true };
        case CREATE_CART_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}

export const cartListReducer = (state = { cart: [] }, action) => {
    switch (action.type) {
        case CART_LIST_REQUEST:
            return { loading: true };
        case CART_LIST_SUCCESS:
            return { loading: false, cart: action.payload };
        case CART_LIST_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

// delete cart
export const cartDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CART_DELETE_REQUEST:
            return { loading: true }
        case CART_DELETE_SUCCESS:
            return { loading: false, success: true };
        case CART_DELETE_FAIL:
            return { loading: false, error: action.payload, success: false };

        default:
            return state;
    }
}

// update cart 
export const cartUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case CART_UPDATE_REQUEST:
            return { loading: true }
        case CART_UPDATE_SUCCESS:

            return { loading: false, success: true }
        case CART_UPDATE_FAIL:
            return { loading: false, error: action.payload, success: false }
        default:
            return state;
    }

}