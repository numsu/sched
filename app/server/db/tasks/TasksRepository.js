const Task = require('./MTask');

const findAll = (callback) => {
    Task.find({}, callback);
}

const save = (task) => {
    new Task(task).save();
}

const findById = (id, callback) => {
    Task.findById(id, callback);
}

const deleteOne = (id, callback) => {
    Task.deleteOne({ id: id }, callback);
}

module.exports = { findAll, save, findById, deleteOne };
