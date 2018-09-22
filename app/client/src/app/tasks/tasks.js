import React, { Component } from 'react';

import './tasks.css';
import http from '../common/util/http-util';
import boardUtil from '../common/util/board-util';
import TaskNew from './task-new/task-new';
import TaskList from './task-list/task-list';

class Tasks extends Component {

    activeBoard = '';
    tasksOpen = [];
    tasksDone = [];

    state = {
        editTask: {},
        tasks: undefined,
        tab: 1
    }

    componentDidMount = () => {
        this.activeBoard = boardUtil.activeBoard;
        boardUtil.getActiveBoardChangedEvent().addListener('activeBoardChange', (activeBoard) => {
            this.activeBoard = activeBoard;
            this.updateTaskList();
        });
        this.updateTaskList();
    }

    updateTaskList = (task = undefined) => {
        if (task) {
            this.tasksOpen = this.tasksOpen.filter(t => t._id !== task._id);
            this.tasksOpen.push(task);
            this.setTasks();
        } else {
            http().get('/task/all/' + this.activeBoard).then(res => {
                this.tasksDone = res.data.filter(task => task.finished);
                this.tasksOpen = res.data.filter(task => !task.finished);
                this.setTasks();
            });
        }
    }

    handleTaskDelete = (id) => {
        this.tasksDone = this.tasksDone.filter(task => task._id !== id);
        this.setTasks();
    }

    handleTaskDone = (id) => {
        const tasksToMove = this.tasksOpen.filter((task) => task._id === id);
        this.tasksOpen = this.tasksOpen.filter((task) => task._id !== id);
        this.tasksDone.push({ ...tasksToMove[0], finished: true });
        boardUtil.removeTaskFromBoard(id);
        this.setTasks();
    }

    handleTaskEdit = (task) => {
        this.setState({
            ...this.state,
            editTask: task
        });
    }

    setTasks = (tab = undefined) => {
        const tasks = (tab || this.state.tab) === 1 ? this.tasksOpen : this.tasksDone;
        const state = { ...this.state, tasks: tasks };
        if (tab) state.tab = tab;

        this.setState(state);
    }

    render() {
        const { editTask, tasks, tab } = this.state;
        return (
            <div className="tasks-wrapper">
                <div className="tasknew-wrapper">
                    <TaskNew    onSubmit={ (task) => this.updateTaskList(task) }
                                editTask={ editTask }
                                clearEditTask={ () => this.handleTaskEdit({}) } />
                </div>
                <div className="tasklist-tabs-wrapper">
                    <div className="tasklist-tabs">
                        <div className={ (tab === 1) ? 'tasklist-tab active' : 'tasklist-tab' } onClick={ () => this.setTasks(1) }>Todo</div>
                        <div className={ (tab === 2) ? 'tasklist-tab active' : 'tasklist-tab' } onClick={ () => this.setTasks(2) }>Done</div>
                    </div>
                </div>
                <div className="tasklist-wrapper">
                    <TaskList   tasks={ tasks }
                                handleDone={ (id) => this.handleTaskDone(id) }
                                handleDelete={ (id) => this.handleTaskDelete(id) }
                                handleEdit={ (task) => this.handleTaskEdit(task) }  />
                </div>
            </div>
        );
    }
}

export default Tasks;