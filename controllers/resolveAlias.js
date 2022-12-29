const { isAliasKek } = require('../services/alias');
const { wsClients } = require('../modules/wsClients');

function resolveAlias(req, res, next) {
    try {
        const { alias } = req.params;
    
        if (isAliasKek(alias)) {
            return next();
        }

        wsClients.forEach((wsClient) => {
            if (wsClient.readyState === 1) {
                wsClient.send(alias);
            }
        });
    
        return res.send(alias);
    } catch (err) {
        next(err);
    }
}

module.exports = { resolveAlias };
