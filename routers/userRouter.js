const Router = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.get('/', authMiddleware, userController.getUser);

// TODO: продолжить.  сделать остальные методы юзера

module.exports = router;
