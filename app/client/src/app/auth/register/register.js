import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import auth from '../../common/util/auth-service';
import './register.css';

class Register extends Component {

    state = {
        user: {
            email: '',
            username: '',
            name: '',
            password: '',
            passwordConfirm: '',
        }
    }

    componentDidMount = () => {
        this.taskInput.focus();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(this.state.user).some(entry => !entry)) return;
        if (this.state.user.password !== this.state.user.passwordConfirm) return;
        this.handleChange({ passwordConfirm: undefined });

        auth.register(this.state.user, success => {
            if (success) {
                location.hash = '/login';
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
            <div className="register-container">
                <div className="register-logo">Sched</div>
                <div className="register-item">
                    <form noValidate onSubmit={ this.handleSubmit }>
                        <div className="register-input-group">
                            <FontAwesomeIcon icon={ faUser } />
                            <input  className="register-input"
                                    ref={ (input) => { this.taskInput = input } }
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={ user.name }
                                    autoComplete="off"
                                    onChange={ (e) => { this.handleChange({ name: e.target.value }) } }></input>
                        </div>

                        <div className="register-input-group">
                            <FontAwesomeIcon icon={ faUser } />
                            <input  className="register-input"
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={ user.username }
                                    autoComplete="off"
                                    onChange={ (e) => { this.handleChange({ username: e.target.value }) } }></input>
                        </div>

                        <div className="register-input-group">
                            <FontAwesomeIcon icon={ faEnvelope } />
                            <input  className="register-input"
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    value={ user.email }
                                    onChange={ (e) => { this.handleChange({ email: e.target.value }) } }></input>
                        </div>
                        <br />

                        <div className="register-input-group">
                            <FontAwesomeIcon icon={ faLock } />
                            <input  className="register-input"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={ user.password }
                                    onChange={ (e) => { this.handleChange({ password: e.target.value }) } }></input>
                        </div>

                        <div className="register-input-group">
                            <FontAwesomeIcon icon={ faLock } />
                            <input  className="register-input"
                                    type="password"
                                    name="passwordConfirm"
                                    placeholder="Confirm password"
                                    value={ user.passwordConfirm }
                                    onChange={ (e) => { this.handleChange({ passwordConfirm: e.target.value }) } }></input>
                        </div>

                        <button type="submit" className="register-submit">Register</button>
                        <Link to="/login">Already have an account?</Link>
                    </form>
                </div>
            </div>
        );
    }

}

export default Register;
