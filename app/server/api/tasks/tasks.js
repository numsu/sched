const router = require('express').Router();
const db = require('../../db/tasks').tasks;

router.post('/new', (req, res) => {
    db.saveTask(req.body);
    res.end();
});

router.get('/all', (req, res) => {
    db.getTasks((err, data) => {
        res.send(data);
    });
});

router.patch('/done', (req, res) => {
    db.findTask(req.body.id, (err, data) => {
        data.finished = true;
        data.save((err1, data1) => {
            res.end();
        });
    });
});

router.delete('/delete', (req, res) => {
    db.deleteTask(req.body.id, (err, data) => {
        res.end();
    });
});

module.exports = router;
