const router = require('express').Router();

// API routes
const tasks = require('./tasks').tasks;
router.use('/task', require('./tasks').tasks);

module.exports = router;
