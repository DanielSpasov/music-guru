import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import router from './Router';

dotenv.config();
const app: Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.DB_URI!, {});
const db = mongoose.connection;
db.once('error', () => console.error('Database:\n Conneciton: Error\n'));
db.once('open', () => console.log('Database:\n Connection: Connected\n'));

app.use(router);

app.listen(process.env.PORT, () =>
  console.log(`Server:\n Status: Running\n PORT: ${process.env.PORT}\n`)
);
