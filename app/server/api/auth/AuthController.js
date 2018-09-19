const router = require('express').Router();
const bcrypt = require('bcrypt');
const userRepository = require('../../db/user').user;
const jwt = require('../../util/JWTUtil');

router.post('/register', (req, res) => {
    const body = req.body;

    userRepository.findByLogin(body.username, (err, users) => {
        if (err || users.length !== 0) {
            res.sendStatus(500).send('Username taken');
        }

        console.log(body.password);

        const hash = bcrypt.hashSync(body.password, 8);

        console.log(hash);

        userRepository.save({
            ...body,
            password: hash
        });

        res.end();
    });
});

router.post('/login', (req, res) => {
    const body = req.body;

    userRepository.findByLogin(body.username, (err, users) => {
        if (err || users.length === 0) {
            res.sendStatus(401);
            return;
        }

        const user = users[0];

        const hash = bcrypt.hashSync(body.password, 8);

        console.log(hash);
        console.log(user.password);

        if (bcrypt.compareSync(body.password, user.password)) {
            res.sendStatus(401);
            return;
        }

        const token = jwt.sign(user);
        res.send({ token: token });
    });
});

module.exports = router;
