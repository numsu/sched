import React, { Component } from 'react';

import './header.css';

class Header extends Component {

    render = () => {
        return (
            <div className="header">
                <div className="logo">
                    <h2 className="text-logo">Sched</h2>
                </div>
                <nav className="navbar">
                </nav>
            </div>
        );
    }

}

export default Header