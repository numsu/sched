const router = require('express').Router();
const jwt = require('../util').jwt;

// API routes
router.use('/task', jwt.verify, require('./tasks').tasks);
router.use('/auth', require('./auth').auth);

module.exports = router;
