import dotenv from 'dotenv';

type Environment = {
  PORT: string;
  SALT_ROUNDS: string;
  JWT_SECRET: string;
  EMAIL_SERVICE_USER: string;
  EMAIL_SERVICE_PASS: string;
  FIREBASE_API_KEY: string;
  FIREBASE_AUTH_DOMAIN: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_STORAGE_BUCKET: string;
  FIREBASE_MESSAGING_SENDER_ID: string;
  FIREBASE_APP_ID: string;
};

export default dotenv.config().parsed as Environment;
