const express = require('express');
//const User = require('./models/user');
//const Task = require('./models/task');
require('./db/mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});