const mongoose = require('mongoose');

const Task = mongoose.model('Task',{
    title: {
        type: String,
        require: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        require: false,
        default: false
    }
});

const task = new Task({title:'Лабораторна 3', description:'Робота з базою даних'});

// task.save().then(()=>{
//     console.log(task);
// }).catch((error) => {
//     console.log(error);
// });

module.exports = Task;