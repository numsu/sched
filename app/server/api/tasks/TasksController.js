const router = require('express').Router();
const taskRepository = require('../../db/tasks').tasks;

router.post('/save', (req, res) => {
    if (req.body._id) {
        taskRepository.findById(req.body._id, (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }

            if (data.userId !== req.userId) {
                console.log('User id does not match saved');
                res.sendStatus(403);
                return;
            }

            data.due = req.body.due;
            data.task = req.body.task;
            data.priority = req.body.priority;
            data.reference = req.body.reference;
            data.description = req.body.description;
            data.save((err1, data1) => {
                if (err1) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }

                res.send(data1);
            });
        });
    } else {
        taskRepository.save({
            ...req.body,
            userId: req.userId
        });

        res.end();
    }
});

router.get('/all', (req, res) => {
    taskRepository.findByUser(req.userId, (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        res.send(data);
    });
});

router.patch('/done', (req, res) => {
    if (!req.body.id) {
        console.log('No id in request');
        res.sendStatus(400);
    }

    taskRepository.findById(req.body.id, (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        if (data.userId !== req.userId) {
            console.log('User id does not match saved');
            res.sendStatus(403);
            return;
        }

        data.finished = true;
        data.save((err1, data1) => {
            if (err1) {
                console.log(err);
                res.sendStatus(500);
                return;
            }

            res.end();
        });
    });
});

router.delete('/delete', (req, res) => {
    taskRepository.findById(req.body.id, (err, data) => {
        if (data.userId !== req.userId) {
            console.log('User id does not match saved');
            res.sendStatus(403);
            return;
        }

        taskRepository.deleteOne(req.body.id, (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }

            res.end();
        });
    });
});

module.exports = router;
