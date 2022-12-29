const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');
const slowDown = require('express-slow-down');

const { disabledPoweredBy } = require('./disabledPoweredBy');

function secure(app) {
    app.use(disabledPoweredBy);

    app.use(
        cors({
            origin: ['http://example.ru', 'http://localhost:3000'],
        })
    );

    app.use(
        helmet({
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    scriptSrc: [
                        "'self'",
                        "'unsafe-inline'",
                        "https://cdn.jsdelivr.net",
                        "https://code.jquery.com",
                    ],
                },
            },
        })
    );

    // можно сделать 120 запросов в минуту с одного ip адреса
    const limiter = rateLimiter({
        windowMs: 1 * 60 * 1000,
        max: 120,
    });

    // 101 запрос, в одной минуте, откладывается на 1 секунду
    // 102 запрос, в одной минуте, откладывается на 2 секунды
    const speedLimiter = slowDown({
        windowMs: 1 * 60 * 1000,
        delayAfter: 100,
        delayMs: 1000,
    });

    app.use(limiter);
    app.use(speedLimiter);
}

module.exports = { secure };
