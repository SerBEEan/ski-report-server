const dbVisitors = require('../db/visitor');

class VisitorsController {
    getVisitors(req, res) {
        try {
            // устанавливается в authMiddleware. Берется из токена            
            const { id, roles } = req.user;

            res.json(dbVisitors);
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'unknown error' });
        }
    }
}

module.exports = new VisitorsController();
