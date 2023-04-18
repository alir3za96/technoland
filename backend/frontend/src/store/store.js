import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {
    listProductsReducer,
    listProductsTopReducer,
    listProductsLastReducer,
    productDetailsReducer,
    productReviewCreateReducer,
    listProductsSearchReducer,
    listProductsSearchPreShowReducer
} from '../reducers/productReducers'

import {cartReducer} from '../reducers/cartReducers'

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userUpdateReducer,
    userDeleteReducer
} from '../reducers/userReducers'

import {
    orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer,
} from '../reducers/orderReducers'
import {
    addProductsCompareReducer,
    addProductsFavoriteReducer,
    listProductsByUserReducer,
    listProductsCompareReducer,
    listProductsFavoriteReducer
} from '../reducers/productListReducers'

const reducer = combineReducers({
    listProducts: listProductsReducer,
    listProductsSearch: listProductsSearchReducer,
    listProductsSearchPreShow: listProductsSearchPreShowReducer,
    listProductsTop: listProductsTopReducer,
    listProductsLast: listProductsLastReducer,

    addProductsFavorite: addProductsFavoriteReducer,
    addProductsCompare: addProductsCompareReducer,

    listProductsByUser: listProductsByUserReducer,

    productDetails: productDetailsReducer,
    productReviewCreate: productReviewCreateReducer,

    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer
})

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },

    userLogin: {userInfo: userInfoFromStorage},
    favProducts: [],
    compareProducts: []
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

const favProductsFromStorage = localStorage.getItem('favProducts') ?
    JSON.parse(localStorage.getItem('favProducts')) : []

const compareProductsFromStorage = localStorage.getItem('compareProducts') ?
    JSON.parse(localStorage.getItem('compareProducts')) : []

export default store