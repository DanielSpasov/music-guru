import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import Routes from './Routes';

dotenv.config();
const app: Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.DB_URI!, {});
const db = mongoose.connection;
db.once('error', () => console.error('Connection Error'));
db.once('open', () => console.log('Database Connected'));

app.use(Routes);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on PORT: ${process.env.PORT}...`)
);
