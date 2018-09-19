import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faUser, faSignInAlt, faTasks } from '@fortawesome/free-solid-svg-icons'

class Header extends Component {

    render = () => {
        return (
            <ul className="nav" role="navigation">
                <li><FontAwesomeIcon icon={ faClipboardList } /><Link to="/">My tasks</Link></li>
                <li><FontAwesomeIcon icon={ faClipboardList } /><Link to="/">Boards</Link></li>
                <li className="logo"><FontAwesomeIcon icon={ faTasks } /></li>
                <li><FontAwesomeIcon icon={ faUser } /><Link to="/profile">Profile</Link></li>
                <li><FontAwesomeIcon icon={ faSignInAlt } /><Link to="/login">Login</Link></li>
            </ul>
        );
    }

}

export default Header