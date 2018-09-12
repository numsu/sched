import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

import '../loader.css';
import './task-list.css';
import axios from 'axios';
import moment from 'moment';

class TaskList extends Component {

    state = {
        tasks: undefined
    }

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps = (props) => {
        this.setState(props);
    }

    handleDone = (id) => {
        this.props.handleDone(id);
    }

    handleDelete = (id) => {
        this.props.handleDelete(id);
    }

    handleEdit = (task) => {
        this.props.handleEdit(task);
    }

    taskSorter = (a, b) => {
        const moma = moment(a.due);
        const momb = moment(b.due);

        if (moma.isSame(momb, 'day')) {
            if (a.priority === b.priority) {
                return a.task > b.task;
            }
            return Number(a.priority) > Number(b.priority) ? -1 : 1;
        }
        if (moma.isBefore(momb, 'day')) return -1;
        if (moma.isAfter(momb, 'day')) return 1;
    }

    render = () => {
        const { tasks } = this.state;
        if (!tasks) {
            return (
                <div className="task-list">
                    <div className="task-list-clear"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
                </div>
            );
        } else if (tasks.length > 0) {
            return (
                <div className="task-list">
                    {
                        tasks.sort(this.taskSorter).map(task =>
                            <TaskListItem   task={ task }
                                            key={ task._id }
                                            handleDone={ () => this.handleDone(task._id) }
                                            handleDelete={ () => this.handleDelete(task._id) }
                                            handleEdit={ this.handleEdit } />)
                    }
                </div>
            );
        } else if (tasks.length === 0) {
            return (
                <div className="task-list">
                    <div className="task-list-clear">Cleared! Go ahead and grab a ☕, you superstar 😎🦄</div>
                </div>
            );
        }
    }
}

class TaskListItem extends Component {

    colors = ['85FF93','A3FE92','C2FE91','E0FE90','FFFE8F','EFBE6B','E07F47','D13F23','C20000'];

    getValue = (value) => {
        const current = moment(value);
        if (current.isSame(moment(), 'days')) return 'Today';
        else if (current.isSame(moment().add(1, 'days'), 'day')) return 'Tomorrow';
        else if (current.isSame(moment().subtract(1, 'days'), 'day')) return 'Yesterday';
        else return moment(value).fromNow();
    }

    getStyle = (value) => {
        return { backgroundColor: '#' + this.colors[--value] };
    }

    handleDone = (e, task) => {
        axios.patch('/api/task/done', { id: task._id }).then(() => {
            this.props.handleDone(task._id);
        });
    }

    handleDelete = (e, task) => {
        axios.delete('/api/task/delete', { id: task._id }).then(() => {
            this.props.handleDelete(task._id);
        });
    }

    render = () => {
        const { task, handleEdit } = this.props;
        if (!task.finished) {
            return (
                <div className="task-list-item">
                    <div className="task-list-priority" style={ this.getStyle(task.priority) }>&nbsp;</div>
                    <div className="task-list-due"><span>{ this.getValue(task.due) }</span></div>
                    <div className="task-list-breadtext">
                        <span>{ task.task }</span><br />
                        <span><pre className="task-list-description">{ task.description }</pre></span>
                    </div>
                    <div className="task-list-reference"><span>{ (!!task.reference ? '#' + task.reference : '') }</span></div>
                    <div className="task-list-button-group">
                        <span className="task-list-button edit" onClick={ (e) => handleEdit(task) }><FontAwesomeIcon icon={ faPen }></FontAwesomeIcon></span>
                        <span className="task-list-button done" onClick={ (e) => this.handleDone(e, task) }><FontAwesomeIcon icon={ faCheck }></FontAwesomeIcon></span>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="task-list-item">
                    <div className="task-list-priority" style={ this.getStyle(task.priority) }>&nbsp;</div>
                    <div className="task-list-due"><span>{ this.getValue(task.due) }</span></div>
                    <div className="task-list-breadtext">
                        <span>{ task.task }</span><br />
                        <span><pre className="task-list-description">{ task.description }</pre></span>
                    </div>
                    <div className="task-list-reference"><span>{ (!!task.reference ? '#' + task.reference : '') }</span></div>
                    <div className="task-list-button-group">
                        <div className="task-list-button danger" onClick={ (e) => this.handleDelete(e, task) }><FontAwesomeIcon icon={ faTrash }></FontAwesomeIcon></div>
                    </div>
                </div>
            );
        }
    }
}

export default TaskList;
