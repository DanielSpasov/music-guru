import mongoose from 'mongoose';

function connect(DB_URI: string) {
  mongoose.set('strictQuery', false);
  mongoose.connect(DB_URI, {});
  const db = mongoose.connection;
  db.once('error', err => console.error('Database status: Error', err));
  db.once('open', () => console.log('Database status: Connected'));
  return db;
}

const database = { connect };
export default database;
