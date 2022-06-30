const express = require('express');
const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const visitorRouter = require('./routers/visitorRouter');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/visitor', visitorRouter);

const start = () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
