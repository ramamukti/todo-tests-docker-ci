import { Sequelize, DataTypes } from 'sequelize';
// import process from 'process';
import 'dotenv/config';

// const sequelize = new Sequelize(process.env.DEV_DB_NAME, process.env.DEV_DB_USER, process.env.DEV_DB_PASSWORD, {
//     host: process.env.DEV_DB_HOST,
//     dialect: process.env.DEV_DB_DIALECT
//   });

// I dont know why cant get the NODE_ENV parameter :(
// const env = process.env.NODE_ENV || 'development';

let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
  // sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, config.development);
// }

// Forced to use the static configured env
sequelize = new Sequelize(process.env.POSTGRES_NAME, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  dialect: process.env.POSTGRES_DIALECT
});

const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
    sequelize,
    paranoid: true,
    timestamps: true,
    tableName: 'todos'
});

export default Todo;