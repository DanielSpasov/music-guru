import express, { Application } from 'express';
import cors from 'cors';
import env from './env';

import router from './Router';

const PORT = env.PORT || 8000;

const app: Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(router);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
