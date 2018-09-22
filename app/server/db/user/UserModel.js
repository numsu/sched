const mongoose = require('../../util/MongooseClient').getMongoose();

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    created: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
