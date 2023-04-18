import axios from 'axios';

// const SERVER_URL = "http://127.0.0.1:8000";


export const getProducts = (keyword) => {
    const url = `/api/v1/products${keyword}`;
    return axios.get(url);
}

export const getProductsSearch = (keyword) => {
    const url = `/api/v1/products/search${keyword}`;
    return axios.get(url);
}

export const getProductsSearchPreShow = (keyword) => {
    const url = `/api/v1/products/preshow-search${keyword}`;
    return axios.get(url);
}

export const getProduct = (productId) => {
        const url = `/api/v1/products/${productId}`;
        return axios.get(url);
}


export const getProductsTop = () => {
    const url = '/api/v1/products/top/';
    return axios.get(url);
}

export const getProductsLast = () => {
    const url = '/api/v1/products/last/';
    return axios.get(url);
}


export const favoriteProductList = () => {
    const url = `/api/v1/user/products/favorite/`;
    return axios.get(url);
}

// export const addFavoriteProducts = (pk) => {
//     const url = `/api/v1/user/add-to-favorite/${pk}`;
//     return axios.get(url);
// }

