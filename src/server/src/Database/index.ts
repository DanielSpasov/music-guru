import { getFirestore } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';

const app = initializeApp({
  apiKey: 'AIzaSyCYrMqCrebUPhAmgNLuHVXTVfEHcYCZJD4',
  authDomain: 'music-nerd.firebaseapp.com',
  projectId: 'music-nerd',
  storageBucket: 'music-nerd.appspot.com',
  messagingSenderId: '92229724793',
  appId: '1:92229724793:web:229fccb4d1182274b802a8'
});

const database = getFirestore(app);

export default database;
