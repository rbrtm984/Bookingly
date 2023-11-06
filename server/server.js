require('dotenv').config();

const express = require('express');
const app = express();
const { Pool } = require('pg');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

// configuration object for database initialization
const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT, // using default port at 5432,
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync('us-east-2-bundle.pem').toString()
    }
}

// console.log('Database configuration:', dbConfig);

const pool = new Pool(dbConfig);

// Testing connection
pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
