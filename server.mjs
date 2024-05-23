import express from 'express';
import fetch from 'node-fetch';
import { Sequelize, DataTypes } from 'sequelize';

const app = express();
const PORT = 3000;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

const RiegoLog = sequelize.define('RiegoLog', {
    Accion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Hora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    PorcentajeAguaAhorrado: {
        type: DataTypes.FLOAT
    },
    Caudal: {
        type: DataTypes.FLOAT
    },
    Humedad: {
        type: DataTypes.FLOAT
    },
    Temperatura: {
        type: DataTypes.FLOAT
    }
}, {});

sequelize.sync().then(() => {
    console.log('Base de datos y tablas creadas');
});

app.use(express.static('public'));
app.use(express.json());

const API_KEY = 'da8d47f01eb4704adf3f9de84c12a4f0'; //clave API de OpenWeatherMap
const LOCATION = 'Fraijanes,GT'; // ubicación deseada

app.get('/api/weather', async (req, res) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&appid=${API_KEY}&units=metric&lang=es`);
        const weatherData = await response.json();
        res.json(weatherData);
    } catch (error) {
        console.error('Error obteniendo la información del clima:', error);
        res.status(500).json({ error: 'No se pudo obtener la información del clima.' });
    }
});

app.post('/api/irrigation/pump/on', async (req, res) => {
    const result = await RiegoLog.create({ Accion: 'Encender Riego', Hora: new Date() });
    res.send({ status: 'ok' });
});

app.post('/api/irrigation/pump/off', async (req, res) => {
    const result = await RiegoLog.create({ Accion: 'Apagar Riego', Hora: new Date(), PorcentajeAguaAhorrado: 0, Caudal: 0.5, Humedad: 50, Temperatura: 25 });
    res.send({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
