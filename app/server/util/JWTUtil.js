const jwt = require('jsonwebtoken');

const sign = (user) => {
    return jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
}

const verify = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        console.log('No token');
        res.sendStatus(403);
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            res.sendStatus(403);
            return;
        }

        req.userId = decoded.id;
        next();
    });
}

const decode = (token, callback) => {
    jwt.verify(token, process.env.JWT_SECRET, callback);
}

module.exports = { sign, verify, decode };
