import axios from 'axios';

const auth = {
    user: undefined,
    isAuthenticated: false,

    verify: (callback) => {
        const auth = localStorage.getItem('auth');
        if (!auth) {
            this.isAuthenticated = false;
            callback(false);
        }

        axios.post('/api/auth/check', { token: auth }).then(res => {
            this.user = res;
            this.isAuthenticated = true;
            callback(true);
        }, () => {
            callback(false);
        });
    },

    login: (user, callback) => {
        axios.post('/api/auth/login', user).then(res => {
            localStorage.setItem('auth', res);
            this.user = res;
            this.isAuthenticated = true;
            callback(true);
        }, () => {
            callback(false);
        });
    },

    register: (user, callback) => {
        axios.post('/api/auth/register', user).then(res => {
            callback(true);
        }, () => {
            callback(false);
        })
    },

    logout: (callback) => {
        localStorage.removeItem('auth');
        this.user = undefined;
        this.isAuthenticated = false;
        callback(true);
    }
}

export default auth;
