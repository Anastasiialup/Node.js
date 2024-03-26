const express = require('express');
const User = require('../models/user'); // Імпорт моделі користувача

const router = express.Router();

// GET всіх користувачів
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).send();
    }
});

// GET користувача за ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Створення нового користувача
router.post('/', async (req, res) => {
    const { name, age, email, password } = req.body;
    const user = new User({ name, age, email, password });

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Оновлення інформації про користувача за ID
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send("Error updating user");
    }
});

// Видалення користувача за ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User deleted successfully");
    } catch (error) {
        res.status(400).send("Error deleting user");
    }
});

// Отримання задач користувача за його ID
router.get('/:id/tasks', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).populate('tasks');
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user.tasks);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
