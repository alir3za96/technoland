import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_LIST_SEARCH_REQUEST,
    PRODUCT_LIST_SEARCH_SUCCESS,
    PRODUCT_LIST_SEARCH_FAIL,
    
    PRODUCT_LIST_SEARCH_PRE_SHOW_REQUEST,
    PRODUCT_LIST_SEARCH_PRE_SHOW_SUCCESS,
    PRODUCT_LIST_SEARCH_PRE_SHOW_FAIL,

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
} from "../constants/productConstants"

export const listProductsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, 
                products: action.payload.products, 
                page: action.payload.page, 
                pages: action.payload.pages,
                maxPriceProducts: action.payload.maxPriceProducts,
                minPriceProducts: action.payload.minPriceProducts,
                totalProductsLen: action.payload.totalProductsLen,
                catRoute: action.payload.catRoute
             }
        case PRODUCT_LIST_FAIL:
            return { error: action.payload, loading: false }
        default:
            return state
    }
}
export const listProductsTopReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_TOP_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_TOP_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_TOP_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const listProductsSearchPreShowReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_SEARCH_PRE_SHOW_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SEARCH_PRE_SHOW_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_SEARCH_PRE_SHOW_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const listProductsLastReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_LAST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_LAST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_LAST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const listProductsSearchReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_SEARCH_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SEARCH_SUCCESS:
            return { loading: false, products: action.payload.products, page: action.payload.page, pages: action.payload.pages }
        case PRODUCT_LIST_SEARCH_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const productDetailsReducer = (state = { product: { reviews: [], category: [], brand: [], color:[], gallery:[] }, jCreatedAt:'' }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false,
                product: action.payload.product,
                jCreatedAt: action.payload.convertedDate
                }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, }

        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_CREATE_REVIEW_RESET:
            return {}

        default:
            return state
    }
}
