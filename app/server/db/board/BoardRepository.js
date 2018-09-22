const Board = require('./MBoard');

const save = (board, callback) => {
    new Board(board).save(callback);
}

const findById = (boardId, callback) => {
    Board.findById(boardId, callback);
}

const findByUser = (userId, callback) => {
    Board.find({ user: userId }).exec(callback);
}

const deleteOne = (id, callback) => {
    Board.deleteOne({ id: id }, callback);
}

module.exports = { save, findByUser, findById, deleteOne };
