import express, { Request, Response } from 'express';
import path from 'path';
import { Server } from 'socket.io';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const authRouter = require('./routes/auth');

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
  },
});


app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.use('/auth', authRouter);

app.get('/', (req, res, next) => {
  console.log(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});







