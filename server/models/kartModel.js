import dotenv from 'dotenv';
import { Pool, PoolClient, QueryResult } from 'pg';
import { readFileSync } from 'fs';

// load .env variables
dotenv.config();

// configuration object for database initialization
const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT || '5432'), // using default port at 5432,
    ssl: {
      rejectUnauthorized: true,
      ca: readFileSync('us-east-2-bundle.pem').toString() // .pem file available in slack
    }
}

// console.log('Database configuration:', dbConfig);

const pool = new Pool(dbConfig);

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

  module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };

