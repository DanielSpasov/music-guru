import { getFirestore } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';
import env from '../env';

const app = initializeApp({
  apiKey: env.DB_API_KEY,
  authDomain: env.DB_AUTH_DOMAIN,
  projectId: env.DB_PROJECT_ID,
  storageBucket: env.DB_STORAGE_BUCKET,
  messagingSenderId: env.DB_MESSAGING_SENDER_ID,
  appId: env.DB_APP_ID
});

export default getFirestore(app);
