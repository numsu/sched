const router = require('express').Router();
const boardRepository = require('../../db/board').board;

router.post('/save', (req, res) => {
    boardRepository.save({
        ...req.body,
        user: req.userId
    }, (err, savedBoard) => {
        if (err || !savedBoard) {
            res.sendStatus(500);
            console.error(err);
            return;
        }

        res.send(savedBoard);
    });
});

router.get('/get', (req, res) => {
    boardRepository.findByUser(req.userId, (err, data) => {
        if (err || !data) {
            console.error(err);
            res.sendStatus(500);
            return;
        }

        res.send(data);
    });
});

router.delete('/delete', (req, res) => {
    boardRepository.findById(req.body.id, (err, data) => {
        if (err || !data) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        if (data.user !== req.userId) {
            console.error('User id does not match saved');
            res.sendStatus(403);
            return;
        }

        boardRepository.deleteOne(req.body.id, (err, data) => {
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
