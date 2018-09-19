const router = require('express').Router();
const taskRepository = require('../../db/tasks').tasks;

router.post('/save', (req, res) => {
    if (req.body._id) {
        taskRepository.findById(req.body._id, (err, data) => {
            data.due = req.body.due;
            data.task = req.body.task;
            data.priority = req.body.priority;
            data.reference = req.body.reference;
            data.description = req.body.description;
            data.save((err1, data1) => {
                res.send(data1);
            });
        });
    } else {
        taskRepository.save(req.body);
        res.end();
    }
});

router.get('/all', (req, res) => {
    taskRepository.findAll((err, data) => {
        res.send(data);
    });
});

router.patch('/done', (req, res) => {
    if (!req.body.id) {
        res.sendStatus(400);
    }
    taskRepository.findById(req.body.id, (err, data) => {
        data.finished = true;
        data.save((err1, data1) => {
            res.end();
        });
    });
});

router.delete('/delete', (req, res) => {
    taskRepository.deleteOne(req.body.id, (err, data) => {
        res.end();
    });
});

module.exports = router;
