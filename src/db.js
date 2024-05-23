import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/database.sqlite', // Asegúrate de que esta ruta sea correcta
});

export default sequelize;

