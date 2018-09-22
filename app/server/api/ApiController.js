const router = require('express').Router();
const jwt = require('../util/JWTUtil');

// API routes
router.use('/auth', require('./auth/AuthController'));
router.use('/task', jwt.verify, require('./tasks/TasksController'));
router.use('/board', jwt.verify, require('./board/BoardController'));

module.exports = router;
