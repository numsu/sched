import http from './http-service';
import { EventEmitter } from 'events';

const auth = {
    user: undefined,
    token: undefined,
    _authenticated: false,
    _authenticationEvent: new EventEmitter(),

    verify: (callback) => {
        const token = localStorage.getItem('auth');
        if (!token) {
            auth._authenticated = false;
            callback(false);
        }

        http().post('/auth/check', { token: token }).then(res => {
            auth.user = res.data.user;
            auth.token = res.data.token;
            auth._authenticated = true;
            auth._authenticationEvent.emit('loginChange', true);
            callback(true);
        }, () => {
            callback(false);
        });
    },

    login: (user, callback) => {
        http().post('/auth/login', user).then(res => {
            localStorage.setItem('auth', res.data.token);
            auth.user = res.data.user;
            auth.token = res.data.token;
            auth._authenticated = true;
            auth._authenticationEvent.emit('loginChange', true);
            callback(true);
        }, () => {
            callback(false);
        });
    },

    register: (user, callback) => {
        http().post('/auth/register', user).then(res => {
            callback(true);
        }, () => {
            callback(false);
        })
    },

    logout: () => {
        localStorage.removeItem('auth');
        auth.user = undefined;
        auth.token = undefined;
        auth._authenticated = false;
        auth._authenticationEvent.emit('loginChange', false);
    },

    isAuthenticated: () => {
        return auth._authenticated;
    },

    getAuthEvent: () => {
        return auth._authenticationEvent;
    }
}

export default auth;
