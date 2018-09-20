const mongoose = require('../../util').client.getMongoose();

const taskSchema = new mongoose.Schema({
    userId: String,
    task: String,
    priority: Number,
    due: String,
    description: String,
    reference: String,
    finished: { type: Boolean, default: false }
});
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
