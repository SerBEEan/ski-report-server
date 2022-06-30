const jwt = require('jsonwebtoken');
const { secret } = require('../config');

// TODO: потом пригодится
module.exports = function(roles) {
    return function(req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }
    
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                throw new Error('no authorization');
            }
    
            const {roles: userRoles} = jwt.verify(token, secret);

            let hasRole = false;
            userRoles.forEach((role) => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });

            if (!hasRole) {
                return res.status(403).json({ message: 'У вас нет доступа' });
            }

            next();
        } catch (e) {
            console.log(e);
            res.status(403).json({ message: 'Прользователь не авторизован' });
        }
    }
}