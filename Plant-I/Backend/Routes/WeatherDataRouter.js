const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY =  "";
const lang = 'kr'


router.get('/weatherInfo', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${lang}`);
        const locationResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${response.data.name}&limit=5&appid=${API_KEY}`);

        const weatherData = {
            weather: response.data.weather,
            main: response.data.main,
            wind: response.data.wind,
            name: response.data.name,
            rain: response.data.rain,
            local_name: locationResponse.data[0].local_names.ko
        };
        res.json(weatherData);
    }
    catch (error) {
        console.log(error);
    }
});

module.exports = router;