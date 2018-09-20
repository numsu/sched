import axios from 'axios';
import auth from './auth-util';

const http = () => {
    return axios.create({
        baseURL: '/api',
        headers: {'x-access-token': auth.token }
    });
};

export default http;