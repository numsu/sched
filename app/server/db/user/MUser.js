const mongoose = require('../../util').client.getMongoose();

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

module.exports = User;
