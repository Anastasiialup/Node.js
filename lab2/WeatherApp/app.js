const express = require('express');
const app = express();
const hbs = require('hbs');

// Реєстрація partials
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

const port = 3000;

// Обробник для маршруту /login
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page', pageTitle: 'Login' });
});

// Обробник для маршруту /weather/:city
app.get('/weather/:city', (req, res) => {
    const city = req.params.city;
    res.render('weather', { title: 'Weather Page', pageTitle: 'Weather', city });
});

// Обробник для маршруту /weather (класичний URL з параметром city)
app.get('/weather', (req, res) => {
    const city = req.query.city;
    res.render('weather', { title: 'Weather Page', pageTitle: 'Weather', city });
});

// Обробник для кореневого маршруту /
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page', pageTitle: 'Home' });
});

// Обробка 404 помилки для всіх інших маршрутів
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.use(express.static('public'));