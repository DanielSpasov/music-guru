import { initializeApp } from 'firebase/app';
import { MongoClient } from 'mongodb';

import env from '../env';

// FIREABSE IS USED FOR IMAGE STORAGE ONLY
initializeApp({
  apiKey: env.FIREBASE.API_KEY,
  authDomain: env.FIREBASE.AUTH_DOMAIN,
  projectId: env.FIREBASE.PROJECT_ID,
  storageBucket: env.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE.MESSAGING_SENDER_ID,
  appId: env.FIREBASE.APP_ID
});

export const connect = async () => {
  const connectionString = env.MONGO.DB_URI || '';
  const client = new MongoClient(connectionString);
  const connection = await client.connect();
  return connection.db('music-guru');
};
