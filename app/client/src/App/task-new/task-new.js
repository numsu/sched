import React, { Component } from 'react';

import './task-new.css';
import axios from 'axios';
import moment from 'moment';
import InputNumber from '../common/input-number';
import InputDate from '../common/input-date';

class TaskNew extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        this.init();
    }

    componentDidMount = () => {
        this.taskInput.focus();
    }

    init = () => {
        this.setState({
            task: '',
            priority: 5,
            due: moment().add(1, 'days')
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.task) return;
        axios.post('/api/task/new', this.state).then(() => {
            this.init();
            this.props.onSubmit();
        });
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            ...e
        });
    }

    render = () => {
        const task = this.state;
        return (
            <form noValidate onSubmit={ this.handleSubmit }>

                <div className="tasknew-input-container">
                    <InputDate      className="tasknew-date"
                                    type="date"
                                    model={ task }
                                    modelKey="due"
                                    modelChange={ this.handleChange } />

                    <input          className="input tasknew-input"
                                    ref={ (input) => { this.taskInput = input } }
                                    type="text"
                                    name="tasknew"
                                    placeholder="Write a task..."
                                    value={ task.task }
                                    autoComplete="off"
                                    onChange={ (e) => { this.handleChange({ task: e.target.value }) } }></input>

                    <InputNumber    className="tasknew-number"
                                    model={ task }
                                    modelKey="priority"
                                    modelChange={ this.handleChange } />
                </div>
                <button type="submit" hidden>Pony</button>
            </form>
        );
    }

}

export default TaskNew;
