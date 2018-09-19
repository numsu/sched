import React, { Component } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import './app.css';
import Tasks from './tasks/tasks';
import Login from './auth/login/login';
import Register from './auth/register/register';
import Header from './common/components/header/header';
import auth from './common/util/auth-util';

const RedirectNotLoggedIn = (component) => (
    !auth.isAuthenticated
    ? <Redirect to="/login" />
    : ''
)

const Router = () => (
    <HashRouter>
        <div>
            <Route path='*' component={ Header } />
            <Route exact path='/' render={ RedirectNotLoggedIn || Tasks } />
            <Route path='/login' component={ Login } />
            <Route path='/register' component={ Register } />
        </div>
    </HashRouter>
)

class App extends Component {

    render = () => {
        return (
            <div className="app">
                <Router />
            </div>
        );
    }

}

export default App;