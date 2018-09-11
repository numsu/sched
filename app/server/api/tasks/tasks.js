const router = require('express').Router();
const db = require('../../db/tasks').tasks;

router.post('/save', (req, res) => {
    if (req.body._id) {
        db.findTask(req.body._id, (err, data) => {
            data.due = req.body.due;
            data.task = req.body.task;
            data.priority = req.body.priority;
            data.reference = req.body.reference;
            data.decription = req.body.description;
            data.save((err1, data1) => {
                res.send(data1);
            });
        });
    } else {
        db.saveTask(req.body);
        res.end();
    }
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
