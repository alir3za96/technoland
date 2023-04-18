import { 
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_FAIL,

    CATEGORY_ROUTE_SUCCESS,
    CATEGORY_ROUTE_REQUEST,
    CATEGORY_ROUTE_FAIL,

 } from "../constants/category";

export const listCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_LIST_SUCCESS:
            return { loading: true, categories: [] }
        case CATEGORY_LIST_REQUEST:
            return { loading: false, categories: action.payload }
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const CategoryRouteReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_ROUTE_SUCCESS:
            return { loading: true, categories: [] }
        case CATEGORY_ROUTE_REQUEST:
            return { loading: false, categories: action.payload }
        case CATEGORY_ROUTE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}