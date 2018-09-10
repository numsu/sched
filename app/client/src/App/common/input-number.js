import React, { Component } from 'react';

class InputNumber extends Component {

    colors = ['85FF93','A3FE92','C2FE91','E0FE90','FFFE8F','EFBE6B','E07F47','D13F23','C20000'];
    min = 1;
    max = 9;

    handleWheel = (e, modelChange, modelKey, model) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            if (model[modelKey] === this.max) return;
        } else {
            if (model[modelKey] === this.min) return;
        }

        modelChange({
            [modelKey]: e.deltaY < 0
                ? Number(model[modelKey]) + 1
                : Number(model[modelKey]) - 1
        });
    }

    getStyle = (value) => {
        return { backgroundColor: '#' + this.colors[--value] };
    }

    render = () => {
        const { model, modelKey, modelChange, className } = this.props;
        return (
            <span>
                <input  id={ modelKey }
                        className={ 'input ' + className }
                        type="number"
                        name={ modelKey }
                        value={ model[modelKey] }
                        style={ this.getStyle(model[modelKey]) }
                        onChange={ (e) => {} }
                        onWheel={ (e) => this.handleWheel(e, modelChange, modelKey, model) }></input>
            </span>
        );
    }

}

export default InputNumber;
