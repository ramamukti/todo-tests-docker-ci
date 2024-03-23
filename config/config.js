import 'dotenv/config';

const config = {
    "development": {
      "username": process.env.POSTGRES_USER,
      "password": process.env.POSTGRES_PASSWORD,
      "database": process.env.POSTGRES_NAME,
      "host": process.env.POSTGRES_HOST,
      "dialect": process.env.POSTGRES_DIALECT
    },
    "test": {
      "username": process.env.TEST_DB_USER,
      "password": process.env.TEST_DB_PASSWORD,
      "database": process.env.TEST_DB_NAME,
      "host": process.env.TEST_DB_HOST,
      "dialect": process.env.TEST_DB_DIALECT
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    } 
}

export default config;