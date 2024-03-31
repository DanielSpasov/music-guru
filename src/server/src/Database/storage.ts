import { initializeApp } from 'firebase/app';

import env from '../env';

export const initialize = () => {
  initializeApp({
    apiKey: env.FIREBASE.API_KEY,
    authDomain: env.FIREBASE.AUTH_DOMAIN,
    projectId: env.FIREBASE.PROJECT_ID,
    storageBucket: env.FIREBASE.STORAGE_BUCKET,
    messagingSenderId: env.FIREBASE.MESSAGING_SENDER_ID,
    appId: env.FIREBASE.APP_ID
  });
};
