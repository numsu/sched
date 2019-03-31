import axios from 'axios';
import auth from './auth-service';

const http = () => {
    const http = axios.create({
        baseURL: '/api',
        headers: {'x-access-token': auth.token }
    });

    http.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        if (error.response.status === 401) {
            auth.logout();
            location.hash = '/login';
        }
        return Promise.reject(error.response);
    });

    return http;
};

export default http;