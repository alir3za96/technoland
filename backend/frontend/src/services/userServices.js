import axios from 'axios';

// export const getAllUsers = () => {
//     const url = `/api/v1/products`;
//     return axios.get(url);
// }


export const getUserLogin = (username, password) => {
    const url = '/api/v1/users/login/';
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    return axios.post(
        url,
        { 'username': username, 'password': password },
        config
    );
}