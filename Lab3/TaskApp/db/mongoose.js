const mongoose = require('mongoose');
require('dotenv').config({ path: 'C:/Users/nasti/OneDrive/Рабочий стол/Study/2 course 2 half/Node.js/Lab3/TaskApp/.env' });

const mongoURI = process.env.MONGO_URL;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error.message));

module.exports = mongoose;
