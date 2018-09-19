const User = require('./MUser');

const findById = (id, callback) => {
    User.findById(id, callback);
}

const findByLogin = (username, callback) => {
    User.find({ username: username }, callback);
}

const save = (user) => {
    new User(user).save();
}

module.exports = { findById, save, findByLogin };
