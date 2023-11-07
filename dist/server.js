"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
// load .env variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// configuration object for database initialization
const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: {
        rejectUnauthorized: true,
        ca: (0, fs_1.readFileSync)('us-east-2-bundle.pem').toString() // .pem file available in slack
    }
};
// console.log('Database configuration:', dbConfig);
const pool = new pg_1.Pool(dbConfig);
// Testing connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    if (!client) {
        return console.error('Client is undefined');
    }
    console.log('Database connected successfully with SSL!');
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        console.log(result.rows);
    });
});
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'client', 'dist')));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'client', 'dist', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
