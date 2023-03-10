import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getPizzaReducer } from "../reducers/pizzaReducers";
import { userLoginReducer, userRegisterReducer } from "../reducers/userReducers";
import { cartDeleteReducer, cartListReducer, cartUpdateReducer, createCartReducer } from "../reducers/cartReducer";
import { orderListReducer, placeOrderReducer } from "../reducers/orderReducer";



const reducer = combineReducers({
    getPizza: getPizzaReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    createCartReducer: createCartReducer,
    cartList: cartListReducer,
    cardDelete: cartDeleteReducer,
    cartUpdate: cartUpdateReducer,
    placeOrder: placeOrderReducer,
    listOrder: orderListReducer,

})

const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = {
    userLogin: { userInfo }
};


const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store;