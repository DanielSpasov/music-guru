import express, { Application } from 'express';
import { initializeApp } from 'firebase/app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import router from '../src/Router';

import { errorHandler } from './Middlewares';

const connectMongoDB = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@main-cluster.i7ggact.mongodb.net/models?retryWrites=true&w=majority`
  );
  console.log('\u001b[1;32m' + `MongoDB connected.` + '\u001b[0m');
};

const connectFirestoreBucket = () => {
  initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  });
  console.log('\u001b[1;32m' + `Firestore bucket connected.` + '\u001b[0m');
};

const app: Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await connectMongoDB();
    connectFirestoreBucket();
    console.log(
      '\u001b[1;32m' + `Server running on PORT: ${PORT}` + '\u001b[0m'
    );
  } catch (err) {
    console.error('Failed to start server.');
  }
});

export default app;
