const Task = require('./MTask');

const findAll = (callback) => {
    Task.find({}, callback);
}

const save = (task, callback = undefined) => {
    new Task(task).save(callback);
}

const findById = (id, callback) => {
    Task.findById(id, callback);
}

const findByUserAndBoard = (userId, boardId, callback) => {
    Task.find({ user: userId, board: boardId }, callback);
}

const deleteOne = (id, callback) => {
    Task.deleteOne({ id: id }, callback);
}

module.exports = { findAll, save, findById, findByUserAndBoard, deleteOne };
