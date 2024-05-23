import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db.js';  // Ajustar la ruta de importación de db.js

const RiegoLog = sequelize.define('RiegoLog', {
    Accion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Hora: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    PorcentajeAguaAhorrado: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    Caudal: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    Humedad: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    Temperatura: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
});

export default RiegoLog;
