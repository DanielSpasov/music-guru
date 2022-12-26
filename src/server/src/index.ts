import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import router from './Router';
import db from './Database';

dotenv.config();
const PORT = process.env.PORT || 8000;
const DB_URI = process.env.DB_URI || '';

const app: Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(router);

db.connect(DB_URI);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
