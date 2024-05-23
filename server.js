const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

// Reemplaza 'YOUR_API_KEY' con tu clave de API de OpenWeatherMap
const API_KEY = 'YOUR_API_KEY';

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal
app.get('/welcome', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para obtener el clima
app.get('/api/weather', async (req, res) => {
    const city = 'Tu Ciudad'; // Reemplaza con la ciudad que desees
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            res.json({
                description: data.weather[0].description,
                temperature: data.main.temp,
                humidity: data.main.humidity,
                icon: data.weather[0].icon
            });
        } else {
            res.status(404).json({ message: 'Ciudad no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos del clima' });
    }
});

// Rutas para la API de riego
app.post('/api/irrigation/pump/on', (req, res) => {
    // Simular encendido del riego
    res.json({ message: 'Riego encendido' });
});

app.post('/api/irrigation/pump/off', (req, res) => {
    // Simular apagado del riego
    res.json({ message: 'Riego apagado' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
