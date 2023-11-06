import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { Pool, PoolClient, QueryResult } from 'pg';
import { readFileSync } from 'fs';
import path from 'path';

// load .env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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
pool.connect((err: Error | undefined, client: PoolClient | undefined, release: () => void) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    if (!client) {
      return console.error('Client is undefined');
    }
    console.log('Database connected successfully with SSL!');
    client.query('SELECT NOW()', (err: Error, result: QueryResult) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      console.log(result.rows);
    });
  });

  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
