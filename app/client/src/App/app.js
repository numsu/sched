import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import './app.css';
import Tasks from './tasks/tasks';
import Header from './common/components/header/header';

const Router = () => (
    <HashRouter>
        <div>
            <Route path='*' component={ Header } />
            <Route exact path='/' component={ Tasks } />
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