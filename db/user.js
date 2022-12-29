const bcrypt = require('bcryptjs');
const roles = require('./role');

class User {
    constructor() {
        this._users = [
            this.buildUser(0, 'admin', [roles.ROLE_ADMIN], bcrypt.hashSync('admin', 3), null),
            this.buildUser(1, 'user', [roles.ROLE_USER], bcrypt.hashSync('user', 3), null),
        ];
    }

    get users() {
        return this._users;
    }

    buildUser(id, username, roles, password, photo) {
        return {
            id,             // number
            username,       // string
            roles,          // string[]
            password,       // string
            photo,          // string | null
        };
    }

    // username: string;
    // role: string[];
    // password: string;
    // photo: string | null;
    createUser(username, role, password, photo) {
        const newId = Math.max(...this.users.map((user) => user.id)) + 1;
    
        this.users.push(this.buildUser(newId, username, role, password, photo));
    
        return newId;
    }
    
    // id: number
    deleteUser(id) {
        this.users = this.users.filter((user) => user.id !== id);
    
        return id;
    }
    
    // id: number;
    // username: string | undefined
    // role: string[] | undefined;
    // photo: string | undefined;
    updateUser(id, username, role, photo) {
        const userIndex = this._users.findIndex((user) => user.id === id);
        const currentUser = this._users[userIndex];

        if (userIndex > -1 && currentUser !== undefined) {
            this._users = this._users.splice(userIndex, 1, {
                ...currentUser,
                ...(username !== undefined && { username }),
                ...(role !== undefined && { role }),
                ...(photo !== undefined && { photo }),
            });
        }
    
        return id;
    }
}


exports.user = new User();
