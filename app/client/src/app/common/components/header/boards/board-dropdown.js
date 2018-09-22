import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faSortDown, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import './board-dropdown.css';
import boardUtil from '../../../util/board-service';

class BoardDropdown extends Component {

    state = {
        editMode: false,
        activeBoard: '',
        boards: [],
        board: ''
    }

    componentDidMount = () => {
        this.getBoards();
        boardUtil.getActiveBoardChangedEvent().addListener('activeBoardChange', (activeBoard) => {
            this.setState({
                boards: boardUtil.boards,
                activeBoard: activeBoard
            });
        });
    }

    getBoards = () => {
        boardUtil.getBoards(boards => {
            this.setState({ activeBoard: boardUtil.activeBoard, boards: boards });
        });
    }

    handleChange = (e) => {
        this.setState({
            ...this.state, ...e
        });
    }

    handleBoardChange = (boardId) => {
        boardUtil.changeActiveBoard(boardId);
        this.getBoards();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        boardUtil.saveBoard({ name: this.state.board }, () => {
            this.handleChange({ board: '' });
            this.handleChange({ editMode: false });
        });
    }

    render = () => {
        const { boards, activeBoard, editMode, board } = this.state
        if (boards) {
            return (
                <li className="dropdown"><FontAwesomeIcon icon={ faClipboardList } />
                    <Link to="/">Tasks</Link>
                    <div className="dropdown-content">
                        {
                            boards.map(board =>
                                <div    key={ board._id }
                                        className={ ((board._id == activeBoard) ? 'dropdown-item active' : 'dropdown-item') }
                                        onClick={ () => this.handleBoardChange(board._id) }>{ board.name }
                                        <span className="dropdown-content-info">{ board.tasks.length }</span></div>
                            )
                        }
                        {
                            editMode ?
                            <div className="dropdown-action">
                                <form noValidate onSubmit={ (e) => this.handleSubmit(e) }>
                                    <input  className="input boardnew-input"
                                            ref={ (input) => { this.taskInput = input } }
                                            type="text"
                                            name="boardnew"
                                            placeholder="Board name..."
                                            value={ board.name }
                                            autoComplete="off"
                                            onChange={ (e) => { this.handleChange({ board: e.target.value }) } }></input>
                                    <button type="submit" className="boardnew-button primary"><FontAwesomeIcon icon={ faCheck }/></button>
                                    <button className="boardnew-button danger" onClick={ () => this.handleChange({ editMode: !editMode }) }><FontAwesomeIcon icon={ faTimes }/></button>
                                </form>
                            </div>
                            : <div className="dropdown-action" onClick={ () => this.handleChange({ editMode: !editMode }) }><FontAwesomeIcon icon={ faPlus } />Add a new board...</div>
                        }
                    </div>&nbsp;
                    <FontAwesomeIcon icon={ faSortDown } />
                </li>
            );
        } else {
            return null;
        }
    }

}

export default BoardDropdown;