import express, { Request, Response } from 'express';
import path from 'path';
const loginController = require('./controllers/loginController');


console.log(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
console.log(path.join(__dirname, '..', 'client', 'dist'))

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/', (req: Request, res: Response) => {
  console.log(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

// test endpoint
app.get('/test', loginController.getUser, (req: Request, res: Response) => {
  console.log('server file')
  res.status(200).send(res.locals.data);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
