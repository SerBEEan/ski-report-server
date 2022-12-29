const { user } = require('../db/user');

class UserController {
    getUser(req, res) {
        try {
            // устанавливается в authMiddleware. Берется из токена            
            const { id, roles } = req.user;

            const currentUser = user.find((user) => user.id === id);

            if (!currentUser) {
                return res.status(500).json({ message: 'Пользователь не найден' });
            }

            res.json(currentUser);
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'unknown error' });
        }
    }
}

module.exports = new UserController();
