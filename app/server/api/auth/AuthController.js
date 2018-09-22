const router = require('express').Router();
const bcrypt = require('bcrypt');
const userRepository = require('../../db/user').user;
const boardRepository = require('../../db/board').board;
const jwt = require('../../util/JWTUtil');

router.post('/register', (req, res) => {
    const body = req.body;

    userRepository.findByLogin(body.username, (err, users) => {
        if (err || !users || users.length !== 0) {
            console.error(err || 'User already registered');
            res.sendStatus(500);
            return;
        }

        const hash = bcrypt.hashSync(body.password, 8);

        userRepository.save({
            ...body,
            password: hash
        }, (err, savedUser) => {
            if (err || !savedUser) {
                console.error(err);
                res.sendStatus(500);
                return;
            }

            boardRepository.save({ user: savedUser._id, name: savedUser.name + '\'s board' });
            res.end();
        });
    });
});

router.post('/login', (req, res) => {
    const body = req.body;

    userRepository.findByLogin(body.username, (err, users) => {
        if (err || !users || users.length === 0) {
            console.error(err || 'No user found for login');
            res.sendStatus(401);
            return;
        }

        const user = users[0];

        if (!bcrypt.compareSync(body.password, user.password)) {
            console.error('Invalid password');
            res.sendStatus(401);
            return;
        }

        const token = jwt.sign(user);
        user.password = undefined;
        res.send({ token: token, user: user });
    });
});

router.post('/check', (req, res) => {
    const body = req.body;

    if (!body.token) {
        console.error('No token in request');
        res.sendStatus(401);
        return;
    }

    jwt.decode(body.token, (err, decoded) => {
        if (err) {
            console.error(err);
            res.sendStatus(401);
            return;
        }

        userRepository.findById(decoded.id, (err, data) => {
            if (err || !data) {
                console.error(err);
                res.sendStatus(401);
                return;
            }

            data.password = undefined;
            res.send({ token: body.token, user: data })
        });
    });
});

module.exports = router;
