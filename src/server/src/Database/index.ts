import { NextFunction, Request, Response } from 'express';
import { initializeApp } from 'firebase/app';
import { MongoClient } from 'mongodb';

import env from '../env';

export interface ExtendedRequest extends Request {
  mongo: MongoClient;
}

export const mongo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const request = req as ExtendedRequest;
  request.mongo = await MongoClient.connect(env.MONGO.DB_URI || '');
  next();
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
