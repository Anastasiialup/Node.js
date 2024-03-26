const express = require('express');
const hbs = require('hbs');
const axios = require('axios');
const path = require('path');

const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));

const port = 3000;

const cities = [
    { name: 'Kyiv', countryCode: 'UA' },
    { name: 'New York', countryCode: 'US' },
    // Додайте інші міста, які вам потрібно
];

app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page', pageTitle: 'Home' });
});

app.get('/weather', async (req, res) => {
    try {
        const apiKey = 'be046150ebe43bc62fef219b7701e10d'; // Замініть на свій ключ
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Kyiv,UA&appid=${apiKey}`);
        const weatherData = response.data;
        res.render('weather', { title: 'Weather Info', pageTitle: 'Weather Info', weather: weatherData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching weather data');
    }
});

app.get('/weather/:city', async (req, res) => {
    const cityName = req.params.city;
    const city = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());

    if (!city) {
        res.status(404).send('City not found');
        return;
    }

    try {
        const apiKey = 'be046150ebe43bc62fef219b7701e10d'; // Замініть на свій ключ
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.countryCode}&appid=${apiKey}`);
        const weatherData = response.data;

        // Додайте наступний рядок для виводу вмісту об'єкта у консоль сервера
        console.log(weatherData);

        // Отримаємо значок погоди
        const weatherIcon = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

        res.render('cityWeather', { title: `Weather in ${city.name}`, pageTitle: `Weather in ${city.name}`, city, weather: weatherData, weatherIcon });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching weather data');
    }
});


app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


app.use(express.static('public'));