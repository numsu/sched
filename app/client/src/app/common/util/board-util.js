import http from './http-util';
import { EventEmitter } from 'events';

const auth = {
    boards: undefined,
    activeBoard: undefined,
    _activeBoardChangeEvent: new EventEmitter(),

    getBoards: (callback) => {
        let activeBoard = localStorage.getItem('activeBoard');
        if (activeBoard) auth.activeBoard = activeBoard;
        http().get('/board/get').then(boards => {
            if (!activeBoard || !boards.data.some(board => board._id == activeBoard)) {
                activeBoard = boards.data[0]._id;
                localStorage.setItem('activeBoard', activeBoard);
                auth.changeActiveBoard(activeBoard);
            } else {
                auth.activeBoard = activeBoard;
            }

            auth.boards = boards.data;
            callback(boards.data);
        });
    },

    saveBoard: (board, callback) => {
        http().post('/board/save', board).then(savedBoard => {
            auth.boards.push(savedBoard.data);
            auth.changeActiveBoard(savedBoard.data._id);
            callback(savedBoard.data);
        });
    },

    changeActiveBoard: (newBoard) => {
        localStorage.setItem('activeBoard', newBoard);
        auth.activeBoard = newBoard;
        auth._activeBoardChangeEvent.emit('activeBoardChange', newBoard);
    },

    addTaskToBoard: (task) => {
        const board = auth.boards.filter(board => board._id === auth.activeBoard);
        board[0].tasks.push(task._id);
        auth.changeActiveBoard(auth.activeBoard);
    },

    getActiveBoardChangedEvent: () => {
        return auth._activeBoardChangeEvent;
    }

}

export default auth;
