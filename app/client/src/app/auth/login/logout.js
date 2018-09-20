import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import auth from '../../common/util/auth-util';

class Logout extends Component {
    componentWillMount = () => {
        auth.logout();
    }

    render = () => {
        return ( <Redirect to="/login" /> );
    }
}

export default Logout;