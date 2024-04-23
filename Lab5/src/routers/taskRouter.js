const express = require('express');
const Task = require('../../models/task');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }))

router.get("/task", async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (error) {
        console.error('Помилка пошуку:', error);
        res.status(500).send();
    }
});


router.get("/task/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        res.status(200).send(task);
    } catch (error) {
        console.error('Помилка пошуку за ID:', error);
        res.status(500).send();
    }
});


router.post("/task", async (req,res)=>{
    try {
        const { title, description, completed } = req.body;
        const task = new Task({  title, description, completed});
        await task.save();
        res.status(200).send(task);
    } catch (error){
        console.error('Помилка відправки даних:', error);
        res.status(500).send();
    }
});

router.delete("/task/:id",async (req,res)=>{
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).send({NotFound: 'Не знайдено нічого'});
        }
        await task.deleteOne();
        res.status(200).send(task);
    }catch (error){
        console.error('Помилка',error);
        res.status(400).send();
    }
});

module.exports = router;
