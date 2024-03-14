import { MongoClient } from 'mongodb';

import env from '../env';

export const connect = async () => {
  const connectionString = env.MONGO.DB_URI || '';
  const client = new MongoClient(connectionString);
  const connection = await client.connect();
  return connection.db('music-guru');
};
