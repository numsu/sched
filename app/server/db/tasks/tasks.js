const Task = require('./tasks.model');

const getTasks = (callback) => {
    Task.find({}, callback);
}

const saveTask = (task) => {
    let data = new Task(task);
    data.save();
}

const findTask = (id, callback) => {
    Task.findById(id, callback);
}

const deleteTask = (id, callback) => {
    Task.deleteOne({ id: id }, callback);
}

module.exports = { getTasks, saveTask, findTask, deleteTask };
