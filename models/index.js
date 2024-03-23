'use strict';
// this is the original file of ../models/index.js
// Note: Sequelize v6 has very bad compability with ES Module, I tried to update this file with ES Module, but still doesn't work.
// Note: Please use manual migration method with included SQL files in this project.

// const fs = require('fs');
// const path = require('path');
// import Sequelize from 'sequelize';
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.js')[env];
// const db = {};

import fs from 'node:fs';
import path from 'node:path';
import { Sequelize } from 'sequelize';
import process from 'node:process';
import config from '../config/config.js';

const basename = path.basename(import.meta.url);
const env = process.env.NODE_ENV || 'development';
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

const modelFiles = 
fs
  .readdirSync(new URL('.', import.meta.url))
  .filter(file => (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  ));

for (const file of modelFiles) {
  const model = await import(new URL(file, import.meta.url));
  db[model.name] = model(sequelize, Sequelize.DataTypes);
}

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// module.exports = db;
export default db;
