const Router = require('express');
const authController = require('../controllers/authController');
// const roleMiddleware = require('../middleware/roleMiddleware');
// const roles = require('../db/role');

const router = new Router();

router.post('/login', authController.login);
// router.get('/secret', roleMiddleware([roles.ROLE_ADMIN]), authController.getSecret);

module.exports = router;
