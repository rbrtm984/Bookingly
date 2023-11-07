import express, { Request, Response } from 'express';
import path from 'path';
const authRouter = require('./routes/auth');

console.log(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
console.log(path.join(__dirname, '..', 'client', 'dist'))

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/', (req: Request, res: Response) => {
  console.log(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
