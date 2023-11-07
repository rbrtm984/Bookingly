import dotenv from 'dotenv';
import express from 'express';
import { Pool, PoolClient, QueryResult } from 'pg';
import { readFileSync } from 'fs';
import path from 'path';
import { Server } from 'socket.io';
import cors from 'cors';

// load .env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
  },
});

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

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/', (req, res, next) => {
  console.log(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

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

//Websocket connection logs new user id
io.on('connection', (socket) => {
  console.log('New user connected ', socket.id);
});





