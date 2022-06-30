const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        if (req.headers.authorization === undefined) {
            return res.status(403).json({ message: 'Отсутствует токен авторизации' });
        }

        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Не корректный токен' });
        }

        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();
    } catch (e) {
        console.log(e);

        if (e.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Истек ключ' });
        }

        res.status(403).json({ message: e.message });
    }
};
