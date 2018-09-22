const mongoose = require('../../util/MongooseClient').getMongoose();
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    board: { type: Schema.Types.ObjectId, ref: 'Board' },
    task: String,
    priority: Number,
    due: String,
    description: String,
    reference: String,
    finished: { type: Boolean, default: false },
    created: { type: Date, default: Date.now }
});
const Task = mongoose.model('Task', taskSchema, 'tasks');

module.exports = Task;
