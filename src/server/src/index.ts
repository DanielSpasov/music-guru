import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import router from '../src/Router';

import { connectFirestoreBucket, connectMongoDB } from '../src/Database';
import { errorHandler } from './Middleware';

const app: Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  await connectMongoDB();
  connectFirestoreBucket();
  console.log('\u001b[1;32m' + `Server running on PORT: ${PORT}` + '\u001b[0m');
});

export default app;
