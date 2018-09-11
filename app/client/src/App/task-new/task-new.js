import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp, faTimes } from '@fortawesome/free-solid-svg-icons'

import './task-new.css';
import axios from 'axios';
import moment from 'moment';
import InputNumber from '../common/input-number';
import InputDate from '../common/input-date';
import TaskNewExtra from './task-new-extra/task-new-extra';

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

    componentWillReceiveProps = (props) => {
        if (!!props.editTask._id) {
            this.setState({
                extraContainerVisible: this.editExtra(props.editTask),
                task: props.editTask
            });
        }
    }

    editExtra = (task) => {
        return !!task.reference || !!task.description;
    }

    init = () => {
        this.setState({
            extraContainerVisible: false,
            task: {
                task: '',
                priority: 5,
                description: '',
                reference: '',
                due: moment().add(1, 'days')
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.task) return;
        axios.post('/api/task/save', this.state.task).then((task) => {
            this.init();
            this.props.onSubmit(!!task ? task.data : undefined);
        });
    }

    handleChange = (e) => {
        this.setState({
            extraContainerVisible: this.state.extraContainerVisible,
            task: {
                ...this.state.task,
                ...e
            }
        });
    }

    toggleExtraContainer = () => {
        this.setState({
            ...this.state,
            extraContainerVisible: !this.state.extraContainerVisible,
        });
    }

    isExtraContainerVisible = () => {
        return this.extraContainerVisible;
    }

    render = () => {
        const { task, extraContainerVisible } = this.state;
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
                    {(
                        task.task.length > 0 ?
                        <span className="tasknew-input-clear" onClick={ () => this.init() }><FontAwesomeIcon icon={ faTimes } /></span>
                        : ''
                    )}

                    <InputNumber    className="tasknew-number"
                                    model={ task }
                                    modelKey="priority"
                                    modelChange={ this.handleChange } />
                </div>

                {(
                extraContainerVisible ?
                <div className="tasknew-extra-container">
                    <TaskNewExtra   model={ task }
                                    modelChange={ this.handleChange } />
                </div>
                : ''
                )}

                <div className="tasknew-extra-toggle" onClick={ () => this.toggleExtraContainer() }>
                    {(
                        extraContainerVisible
                        ? <FontAwesomeIcon icon={ faAngleDoubleUp } />
                        : <FontAwesomeIcon icon={ faAngleDoubleDown } />
                    )}

                </div>

                <button type="submit" hidden>Pony</button>
            </form>
        );
    }

}

export default TaskNew;
