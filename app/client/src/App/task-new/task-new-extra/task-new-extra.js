import React, { Component } from 'react';

import './task-new-extra.css';

class TaskNewExtra extends Component {

    state = {
        model: {}
    }

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.setState(this.props);
    }

    componentWillReceiveProps = (props) => {
        this.setState(props);
    }

    handleChange = (e, modelKey) => {
        this.props.modelChange({ [modelKey]: e.target.value });
    }

    render = () => {
        const { model } = this.state;
        return (
            <div className="task-new-extra-wrapper">
                <div className="task-new-extra-left">
                    <TaskNewExtraField  model={ model }
                                        modelKey="reference"
                                        label="Refererence..."
                                        modelChange={ this.handleChange } />
                </div>
                <div className="task-new-extra-right">
                    <TaskNewExtraField  model={ model }
                                        modelKey="description"
                                        label="Write a longer description..."
                                        modelChange={ this.handleChange }
                                        textarea />
                </div>
            </div>
        );
    }

}

class TaskNewExtraField extends Component {

    render = () => {
        const { model, modelKey, label, modelChange, textarea } = this.props;

        if (textarea) {
            return (
                <div className="task-new-extra-field">
                    <textarea   className="task-new-extra-field-input"
                                name={ modelKey }
                                placeholder={ label }
                                id={ modelKey }
                                value={ model[modelKey] || '' }
                                onChange={ (e) => { modelChange(e, modelKey) } }
                                type="text"
                                rows="6"></textarea>
                </div>
            );
        } else {
            return (
                <div className="task-new-extra-field">
                    <input  className="task-new-extra-field-input"
                            name={ modelKey }
                            placeholder={ label }
                            id={ modelKey }
                            value={ model[modelKey] || '' }
                            onChange={ (e) => { modelChange(e, modelKey) } }
                            type="text" />
                </div>
            );
        }
    }

}

export default TaskNewExtra;