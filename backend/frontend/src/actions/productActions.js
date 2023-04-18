import { getProducts, 
    getProduct, 
    getProductsTop,
    getProductsLast, 
    getProductsSearch,
    getProductsSearchPreShow
} from "../services/productServices"

import axios from "axios"
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_LIST_TOP_REQUEST,
    PRODUCT_LIST_TOP_SUCCESS,
    PRODUCT_LIST_TOP_FAIL,

    PRODUCT_LIST_LAST_REQUEST,
    PRODUCT_LIST_LAST_SUCCESS,
    PRODUCT_LIST_LAST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_LIST_SEARCH_REQUEST,
    PRODUCT_LIST_SEARCH_SUCCESS,
    PRODUCT_LIST_SEARCH_FAIL,

    PRODUCT_LIST_SEARCH_PRE_SHOW_REQUEST,
    PRODUCT_LIST_SEARCH_PRE_SHOW_SUCCESS,
    PRODUCT_LIST_SEARCH_PRE_SHOW_FAIL,

} from "../constants/productConstants"


export const listProducts = (keyword='') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await getProducts(keyword)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
export const listProductsSearch = (keyword='') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_SEARCH_REQUEST })

        const { data } = await getProductsSearch(keyword)

        dispatch({
            type: PRODUCT_LIST_SEARCH_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_SEARCH_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
export const listProductsSearchPreShow = (keyword='') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_SEARCH_PRE_SHOW_REQUEST })

        const { data } = await getProductsSearchPreShow(keyword)

        dispatch({
            type: PRODUCT_LIST_SEARCH_PRE_SHOW_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_SEARCH_PRE_SHOW_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
export const listProductsTop = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_TOP_REQUEST })

        const { data } = await getProductsTop()

        dispatch({
            type: PRODUCT_LIST_TOP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_TOP_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
export const listProductsLast = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_LAST_REQUEST })

        const { data } = await getProductsLast()

        dispatch({
            type: PRODUCT_LIST_LAST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_LAST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await getProduct(id)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}


export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/v1/products/${productId}/reviews/`,
            review,
            config
        )
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data,
        })



    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}