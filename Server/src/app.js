const express = require('express');
const cors = require('cors')
const userRouter = require('./routes/user.router');
const app = express();
app.use(cors({
    origin: 'http://localhost:8080'
}));
app.use(express.json());
app.use('/users',userRouter);
module.exports = app;