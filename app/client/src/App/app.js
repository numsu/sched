import React, { Component } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import './app.css';
import Tasks from './tasks/tasks';
import Login from './auth/login/login';
import Logout from './auth/login/logout';
import Register from './auth/register/register';
import Header from './common/components/header/header';
import auth from './common/util/auth-service';

class RedirectNotLoggedIn extends Component {

    state = {
        authenticated: undefined
    }

    componentWillMount = () => {
        auth.verify((authenticated) => {
            if (authenticated) {
                this.setState({ authenticated: true });
            } else {
                this.setState({ authenticated: false });
            }
        });
    }

    render = () => {
        const { authenticated } = this.state;

        if (authenticated === undefined) {
            return null;
        } else if (authenticated) {
            return ( <Tasks /> );
        } else {
            return ( <Redirect to="/login" /> );
        }
    }
}

const Router = () => (
    <HashRouter>
        <div>
            <Route path='*' component={ Header } />
            <Route exact path='/' component={ RedirectNotLoggedIn } />
            <Route path='/login' component={ Login } />
            <Route path='/logout' component={ Logout } />
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