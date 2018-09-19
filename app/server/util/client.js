const url = process.env.DB_URL;

let _mongoose = require('mongoose');

const connect = () => {
    _mongoose.Promise = global.Promise;
    _mongoose.connect(url);
}

const getMongoose = () => {
    return _mongoose;
}

module.exports = { connect, getMongoose };
