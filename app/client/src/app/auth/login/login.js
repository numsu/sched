import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import auth from '../../common/util/auth-service';
import './login.css';

class Login extends Component {

    state = {
        user: {
            username: '',
            password: '',
        }
    }

    componentDidMount = () => {
        this.taskInput.focus();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(this.state.user).some(entry => !entry)) return;
        auth.login(this.state.user, success => {
            if (success) {
                location.hash = '/';
            }
        });
    }

    handleChange = (e) => {
        this.setState({
            user: {
                ...this.state.user,
                ...e
            }
        });
    }

    render = () => {
        const { user } = this.state;
        return (
            <div className="login-container">
                <div className="login-logo">Sched</div>
                <div className="login-item">
                    <form noValidate onSubmit={ this.handleSubmit }>
                        <div className="login-input-group">
                            <FontAwesomeIcon icon={ faUser } />
                            <input  className="login-input"
                                    ref={ (input) => { this.taskInput = input } }
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={ user.username }
                                    autoComplete="off"
                                    onChange={ (e) => { this.handleChange({ username: e.target.value }) } }></input>
                        </div>

                        <div className="login-input-group">
                            <FontAwesomeIcon icon={ faLock } />
                            <input  className="login-input"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={ user.password }
                                    onChange={ (e) => { this.handleChange({ password: e.target.value }) } }></input>
                        </div>

                        <button type="submit" className="login-submit">Login</button>

                        <Link to="/register">Don't have an account?</Link>
                    </form>
                </div>
            </div>
        );
    }

}

export default Login;
