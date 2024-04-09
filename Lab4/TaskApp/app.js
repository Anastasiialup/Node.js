const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user'); // Імпорт моделі користувача
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

const Task = require('./models/task');

const task = new Task({
    title: 'Complete Node.js course',
    description: 'Finish all assignments and projects',
    completed: false
});

task.save()
    .then(() => {
        console.log('Task saved successfully:', task);
    })
    .catch((error) => {
        console.error('Error saving task:', error);
    });

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
