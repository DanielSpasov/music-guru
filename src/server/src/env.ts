import dotenv from 'dotenv';

type Environment = {
  PORT: string;
  SECURITY: {
    SALT_ROUNDS: string;
    JWT_SECRET: string;
  };
  EMAIL: {
    SERVICE_USER: string;
    SERVICE_PASS: string;
  };
  FIREBASE: {
    API_KEY: string;
    AUTH_DOMAIN: string;
    PROJECT_ID: string;
    STORAGE_BUCKET: string;
    MESSAGING_SENDER_ID: string;
    APP_ID: string;
  };
  MONGO: {
    DB_URI: string;
  };
};

const config = dotenv.config().parsed;
const env = {
  PORT: config?.PORT,
  FIREBASE: {
    API_KEY: config?.FIREBASE_API_KEY,
    APP_ID: config?.FIREBASE_APP_ID,
    AUTH_DOMAIN: config?.FIREBASE_AUTH_DOMAIN,
    MESSAGING_SENDER_ID: config?.FIREBASE_MESSAGING_SENDER_ID,
    PROJECT_ID: config?.FIREBASE_PROJECT_ID,
    STORAGE_BUCKET: config?.FIREBASE_STORAGE_BUCKET
  },
  MONGO: {
    DB_URI: config?.MONGO_DB_URI
  },
  EMAIL: {
    SERVICE_PASS: config?.EMAIL_SERVICE_PASS,
    SERVICE_USER: config?.EMAIL_SERVICE_USER
  },
  SECURITY: {
    JWT_SECRET: config?.JWT_SECRET,
    SALT_ROUNDS: config?.SALT_ROUNDS
  }
} as Environment;

export default env;
