const User = require('./UserModel');

const findById = (id, callback) => {
    User.findById(id, callback);
}

const findByLogin = (username, callback) => {
    User.find({ username: username }, callback);
}

const save = (user, callback = undefined) => {
    new User(user).save(callback);
}

module.exports = { findById, save, findByLogin };
