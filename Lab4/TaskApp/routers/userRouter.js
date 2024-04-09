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

router.post('/users', async (req, res) => {
    const { name, age, email, password } = req.body;
    const user = new User({ name, age, email, password });

    try {
        await user.save();
        if (!user) {
            return res.status(500).send({ error: 'Користувача з вказаним ідентифікатором не знайдено' });
        }
        res.status(201).send(user);
    } catch (error) {
        console.error('Помилка збереження даних користувача:', error);
        res.status(500).send();
    }
});


// Оновлення інформації про користувача за ID
router.patch("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        // Оновлення полів користувача, якщо вони були надіслані в запиті
        const fieldsToUpdate = ["name", "age", "email", "password"];
        fieldsToUpdate.forEach((field) => {
            if (req.body[field]) {
                user[field] = req.body[field];
            }
        });

        // Збереження оновленого користувача
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(400).send(error.message);
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
