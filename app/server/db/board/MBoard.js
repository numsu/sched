const mongoose = require('../../util').client.getMongoose();
const Schema = mongoose.Schema;

const boardSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    created: { type: Date, default: Date.now }
});
const Board = mongoose.model('Board', boardSchema, 'boards');

module.exports = Board;
