const express = require('express');
const Task = require('../models/task'); // Імпорт моделі завдання

const router = express.Router();

// GET всіх завдань
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(500).send();
    }
});

// GET завдання за ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).send("Task not found");
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Створення нового завдання
router.post('/', async (req, res) => {
    const { title, description, completed } = req.body;
    const task = new Task({ title, description, completed });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Оновлення інформації про завдання за ID
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, updates, { new: true });
        if (!task) {
            return res.status(404).send("Task not found");
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(400).send("Error updating task");
    }
});

// Видалення завдання за ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).send("Task not found");
        }
        res.status(200).send("Task deleted successfully");
    } catch (error) {
        res.status(400).send("Error deleting task");
    }
});

// Отримання додаткових деталей про завдання (наприклад, коментарі)
router.get('/:id/details', async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findById(taskId).populate('details');
        if (!task) {
            return res.status(404).send("Task not found");
        }
        res.status(200).send(task.details);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
