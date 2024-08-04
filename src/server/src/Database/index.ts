import { initializeApp } from 'firebase/app';
import { MongoClient } from 'mongodb';

import env from '../env';

export const connect = async () => {
  console.log(env);
  console.log(process.env.MONGO_DB_USER);
  console.log(process.env.MONGO_DB_PASS);
  return await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@main-cluster.i7ggact.mongodb.net/?retryWrites=true&w=majority`
  );
};

export const initFirestoreBucket = () => {
  initializeApp({
    apiKey: env.FIREBASE.API_KEY,
    authDomain: env.FIREBASE.AUTH_DOMAIN,
    projectId: env.FIREBASE.PROJECT_ID,
    storageBucket: env.FIREBASE.STORAGE_BUCKET,
    messagingSenderId: env.FIREBASE.MESSAGING_SENDER_ID,
    appId: env.FIREBASE.APP_ID
  });
};
