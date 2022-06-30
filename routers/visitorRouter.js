const Router = require('express');
const visitorController = require('../controllers/visitorController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.get('/', authMiddleware, visitorController.getVisitors);

module.exports = router;
