require('dotenv').config()

module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'fancy-todo',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
}
