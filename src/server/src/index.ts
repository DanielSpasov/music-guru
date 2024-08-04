import express, { Application } from 'express';
import cors from 'cors';

import router from '../src/Router';

import { initFirestoreBucket } from '../src/Database';
initFirestoreBucket();

const app: Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(router);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log('\u001b[1;32m' + `Server running on PORT: ${PORT}` + '\u001b[0m')
);

export default app;
