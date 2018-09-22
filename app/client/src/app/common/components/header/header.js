import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt, faTasks } from '@fortawesome/free-solid-svg-icons'

import './header.css';
import BoardDropdown from './boards/board-dropdown';
import auth from '../../util/auth-util';

class Header extends Component {

    state = {
        authenticated: false
    }

    componentDidMount = () => {
        auth.getAuthEvent().addListener('loginChange', (authenticated) => {
            this.setState({ authenticated: authenticated });
        });
    }

    render = () => {
        const { authenticated } = this.state;
        if (authenticated) {
            return (
                <ul className="nav" role="navigation">
                    <BoardDropdown />
                    <li>&nbsp;</li>
                    <li className="logo"><FontAwesomeIcon icon={ faTasks } /></li>
                    <li><FontAwesomeIcon icon={ faUser } /><Link to="/profile">Profile</Link></li>
                    <li><FontAwesomeIcon icon={ faSignInAlt } /><Link to="/logout">Logout</Link></li>
                </ul>
            );
        } else {
            return (
                <ul className="nav" role="navigation">
                    <li className="logo"><FontAwesomeIcon icon={ faTasks } /></li>
                </ul>
            );
        }
    }

}

export default Header;