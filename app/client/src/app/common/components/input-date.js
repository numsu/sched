import React, { Component } from 'react';

import moment from 'moment';

class InputDate extends Component {

    handleWheel = (e, modelChange, modelKey, model) => {
        e.preventDefault();
        modelChange({
            [modelKey]: e.deltaY < 0
                ? moment(model[modelKey]).add(1, 'days')
                : moment(model[modelKey]).subtract(1, 'days')
        });
    }

    /* If value is more distant than 7 days, display a numeric date, else display it in text */
    getValue = (value) => {
        const current = moment(value);
        if (current.isAfter(moment().add(7, 'days'))
            || current.isBefore(moment().subtract(7, 'days'))) return moment(value).format('DD.MM.YYYY');
        else if (current.isSame(moment(), 'days')) return 'Today';
        else if (current.isSame(moment().add(1, 'days'), 'day')) return 'Tomorrow';
        else if (current.isSame(moment().subtract(1, 'days'), 'day')) return 'Yesterday';
        else return moment(value).fromNow();
    }

    render = () => {
        const { model, modelKey, modelChange, className } = this.props;
        return (
            <span>
                <input  id={ modelKey }
                        className={ 'input ' + className }
                        type="text"
                        name={ modelKey }
                        value={ this.getValue(model[modelKey]) }
                        onChange={ (e) => {} }
                        onWheel={ (e) => this.handleWheel(e, modelChange, modelKey, model) }></input>
            </span>
        );
    }

}

export default InputDate;
