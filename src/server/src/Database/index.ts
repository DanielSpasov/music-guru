import { initializeApp } from 'firebase/app';
import { MongoClient } from 'mongodb';

export const connect = async () => {
  return await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@main-cluster.i7ggact.mongodb.net/?retryWrites=true&w=majority`
  );
};

export const initFirestoreBucket = () => {
  initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  });
};
