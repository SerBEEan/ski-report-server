const bcrypt = require('bcryptjs');
const roles = require('./role');

const buildUser = (id, username, roles, password, photo) => ({
    id,             // number
    username,       // string
    roles,          // string[]
    password,       // string
    photo,          // string | null
});

module.exports = [
    buildUser(0, 'admin', [roles.ROLE_ADMIN], bcrypt.hashSync('admin', 3), null),
    buildUser(1, 'user', [roles.ROLE_USER], bcrypt.hashSync('user', 3), null),
];
