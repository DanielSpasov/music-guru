import { initializeApp } from 'firebase/app';
import { MongoClient } from 'mongodb';

import env from '../env';

export const connect = () =>
  MongoClient.connect(
    `mongodb+srv://${env.MONGO.USER}:${env.MONGO.PASS}@main-cluster.i7ggact.mongodb.net/`
  );

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
