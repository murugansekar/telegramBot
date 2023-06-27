const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD || '',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT,
}