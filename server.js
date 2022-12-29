const path = require('path');
const http = require('http');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const { accessLogs } = require('./middleware/accessLogs');
const { notFound } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');
const { security } = require('./middleware/security');
const { ping } = require('./controllers/ping');
const { resolveAlias } = require('./controllers/resolveAlias');
const { dumpDatabase } = require('./utils/dumpDatabase');
const { monitorProcess } = require('./utils/monitorProcess');

const ws = require('./ws');

const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const visitorRouter = require('./routers/visitorRouter');

const PORT = process.env.PORT || 5000;

const app = express();

security(app);

app.use(express.json());

// app.use('/api/auth', authRouter);
// app.use('/api/user', userRouter);
// app.use('/api/visitor', visitorRouter);

app.use(accessLogs());
app.use(accessLogs(true));

app.get('/ping', ping);
app.get('/:alias', resolveAlias);

// app.use(
//     process.env.NODE_ENV === 'production'
//         ? express.static(path.resolve(__dirname, '../client/dist'))
//         : createProxyMiddleware({
//             target: 'http://localhost:3001',
//             changeOrigin: true,
//         })
// );

app.use(notFound);

app.use(errorHandler);

const server = http.createServer(app);
upgradeWithWs(server);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// dumpDatabase();
// monitorProcess();
