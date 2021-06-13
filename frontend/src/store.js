import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {productDetailsReducer, productListReducer, productCreateReducer, productUpdateReducer, productDeleteReducer, productReviewCreateReducer } from './reducers/productReducers';
import {
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
  userListReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
  userDeleteReducer,
} from './reducers/userReducers';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
          ? JSON.parse(localStorage.getItem('userInfo'))
          : null,
    },
};
const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    userSignin: userSigninReducer, 
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;

