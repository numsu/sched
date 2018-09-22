const router = require('express').Router();
const taskRepository = require('../../db/tasks').tasks;
const boardRepository = require('../../db/board').board;

router.post('/save', (req, res) => {
    if (req.body._id) {
        taskRepository.findById(req.body._id, (err, data) => {
            if (err || !data) {
                console.error(err);
                res.sendStatus(500);
                return;
            }

            if (data.user != req.userId) {
                console.error('User id does not match saved');
                res.sendStatus(403);
                return;
            }

            data.due = req.body.due;
            data.task = req.body.task;
            data.priority = req.body.priority;
            data.reference = req.body.reference;
            data.description = req.body.description;
            data.save((err1, data1) => {
                if (err1 || !data1) {
                    console.error(err);
                    res.sendStatus(500);
                    return;
                }

                res.send(data1);
            });
        });
    } else {
        boardRepository.findById(req.body.board, (err, board) => {
            if (err || !board) {
                console.error(err);
                res.sendStatus(500);
                return;
            }

            taskRepository.save({
                ...req.body,
                user: req.userId
            }, (err, newTask) => {
                if (err || !newTask) {
                    console.error(err);
                    res.sendStatus(500);
                    return;
                }

                board.tasks.push(newTask._id);
                boardRepository.save(board);
                res.send(newTask);
            });
        });
    }
});

router.get('/all/:boardId', (req, res) => {
    taskRepository.findByUserAndBoard(req.userId, req.params.boardId, (err, data) => {
        if (err || !data) {
            console.error(err);
            res.sendStatus(500);
            return;
        }

        res.send(data);
    });
});

router.patch('/done', (req, res) => {
    if (!req.body.id) {
        console.error('No id in request');
        res.sendStatus(400);
    }

    taskRepository.findById(req.body.id, (err, data) => {
        if (err || !data) {
            console.error(err);
            res.sendStatus(500);
            return;
        }

        if (data.user != req.userId) {
            console.error('User id does not match saved');
            res.sendStatus(403);
            return;
        }

        data.finished = true;
        data.save((err1, data1) => {
            if (err1 || !data1) {
                console.error(err);
                res.sendStatus(500);
                return;
            }

            res.end();
        });
    });
});

router.delete('/delete/:id', (req, res) => {
    taskRepository.findById(req.params.id, (err, data) => {
        if (err || !data) {
            console.error(err);
            res.sendStatus(500);
            return;
        }

        if (data.user != req.userId) {
            console.error('User id does not match saved');
            res.sendStatus(403);
            return;
        }

        taskRepository.deleteOne(req.body.id, (err, data) => {
            if (err || !data) {
                console.error(err);
                res.sendStatus(500);
                return;
            }

            res.end();
        });
    });
});

module.exports = router;
