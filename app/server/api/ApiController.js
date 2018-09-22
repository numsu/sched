const router = require('express').Router();
const jwt = require('../util').jwt;

// API routes
router.use('/auth', require('./auth').auth);
router.use('/task', jwt.verify, require('./tasks').tasks);
router.use('/board', jwt.verify, require('./board').board);

module.exports = router;
