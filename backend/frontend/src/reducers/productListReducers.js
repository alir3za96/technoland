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

export const listProductsByUserReducer = (state = { favorite_products: [], compare_products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_BY_USER_REQUEST:
            return { loading: true, favorite_products: [], compare_products: [] }
        case PRODUCT_LIST_BY_USER_SUCCESS:
            return {
                loading: false,
                favorite_products: action.payload.favorite_products,
                compare_products: action.payload.compare_products
            }
        case PRODUCT_LIST_BY_USER_FAIL:
            return { error: action.payload, loading: false, page:action.payload.page, pages:action.payload.pages}
        default:
            return state
    }
}

export const addProductsFavoriteReducer = (state = { favorite_products: [] }, action) => {
    switch (action.type) {
        case ADD_FAVORITE_PRODUCT_REQUEST:
            return { loading: true, products: [] }
        case ADD_FAVORITE_PRODUCT_SUCCESS:
            return { loading: false, success: true, message: action.payload.message, add: action.payload.add, remove: action.payload.remove }
        case ADD_FAVORITE_PRODUCT_FAIL:
            return { error: action.payload, loading: false }
        default:
            return state
    }
}

export const addProductsCompareReducer = (state = { compare_products: [] }, action) => {
    switch (action.type) {
        case ADD_TO_COMPARE_PRODUCT_REQUEST:
            return { loading: true, products: [] }
        case ADD_TO_COMPARE_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload.message,
                remove: action.payload.remove
            }
        case ADD_TO_COMPARE_PRODUCT_FAIL:
            return { error: action.payload, loading: false }
        default:
            return state
    }
}
