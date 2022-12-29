const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { user } = require('../db/user');
const { secret } = require('../config');

const generateAccessToken = (id, roles) => jwt.sign({ id, roles }, secret, { expiresIn: '24h' });

class AuthController {
    login(req, res) {
        try {
            const { username, password } = req.body;

            if (username === undefined || password === undefined) {
                return res.status(400).json({ message: 'Не корректные данные' });
            }

            const currentUser = user.find((user) => user.username === username);
            if (!currentUser) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            }

            const validPass = bcrypt.compareSync(password, currentUser.password);
            if (!validPass) {
                return res.status(400).json({ message: 'Введен неверный пароль' });
            }

            const token = generateAccessToken(currentUser.id, currentUser.roles);
            res.json({ token });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'unknown error' });
        }
    }

    // getSecret(req, res) {
    //     try {
    //         res.json({ message: 'hello world, admin' });
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
}

module.exports = new AuthController();
