import axios from 'axios';

export const getMainCategories = () => {
    const url = `/api/v1/categories/main/`;
    return axios.get(url);
}
export const getCatRoute = (catName) => {
    const url = `/api/v1/categories/route?catName=${catName}`;
    return axios.get(url);
}

export const getSliders = () => {
    const url = `/api/v1/sliders/`;
    return axios.get(url);
}

export const getBrands = () => {
    const url = `/api/v1/brands/`;
    return axios.get(url);
}

export const getColors = () => {
    const url = `/api/v1/colors/`;
    return axios.get(url);
}
