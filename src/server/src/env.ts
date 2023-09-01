import dotenv from 'dotenv';

type Environment = {
  PORT: string;
  SALT_ROUNDS: string;
  JWT_SECRET: string;
  EMAIL_SERVICE_USER: string;
  EMAIL_SERVICE_PASS: string;
  DB_API_KEY: string;
  DB_AUTH_DOMAIN: string;
  DB_PROJECT_ID: string;
  DB_STORAGE_BUCKET: string;
  DB_MESSAGING_SENDER_ID: string;
  DB_APP_ID: string;
};

export default dotenv.config().parsed as Environment;
