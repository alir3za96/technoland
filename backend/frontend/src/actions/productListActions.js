import {
    getProducts,
    addFavoriteProducts,
    favoriteProductList
} from "../services/productServices"

import axios from "axios"

import {
    PRODUCT_LIST_BY_USER_REQUEST,
    PRODUCT_LIST_BY_USER_SUCCESS,
    PRODUCT_LIST_BY_USER_FAIL,

    ADD_FAVORITE_PRODUCT_REQUEST,
    ADD_FAVORITE_PRODUCT_SUCCESS,
    ADD_FAVORITE_PRODUCT_FAIL,

    ADD_TO_COMPARE_PRODUCT_REQUEST,
    ADD_TO_COMPARE_PRODUCT_SUCCESS,
    ADD_TO_COMPARE_PRODUCT_FAIL
} from "../constants/productListConstants"


export const listByUserProducts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_LIST_BY_USER_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/v1/user/products/favorite/`,
            config
        )

        dispatch({
            type: PRODUCT_LIST_BY_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_BY_USER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const addFavoriteProductsAction = (pk) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_FAVORITE_PRODUCT_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/v1/user/add-to-favorite/${pk}`,
            config
        )
        // const { data } = await addFavoriteProducts(pk)

        dispatch({
            type: ADD_FAVORITE_PRODUCT_SUCCESS,
            payload: data
        })

        dispatch(listByUserProducts())

    } catch (error) {
        dispatch({
            type: ADD_FAVORITE_PRODUCT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const addCompareProductsAction = (pk) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_TO_COMPARE_PRODUCT_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/v1/user/add-to-compare/${pk}`,
            config
        )

        dispatch({
            type: ADD_TO_COMPARE_PRODUCT_SUCCESS,
            payload: data
        })

        dispatch(listByUserProducts())

    } catch (error) {
        dispatch({
            type: ADD_TO_COMPARE_PRODUCT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
