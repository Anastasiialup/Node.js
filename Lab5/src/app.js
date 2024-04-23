const express = require('express');
const userRouter = require('../src/routers/userRouter');
const taskRouter = require('../src/routers/taskRouter');

require('../db/mongoose')

const app = express();

app.use(userRouter);
app.use(taskRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});