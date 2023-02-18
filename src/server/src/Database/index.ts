import mongoose from 'mongoose';
import gridfs from 'gridfs-stream';

function run(DB_URI: string) {
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(DB_URI, {});

    const db = mongoose.connection;
    db.once('open', () => {
      console.log('Database status: Connected');
      const gfs = gridfs(mongoose.connection.db, mongoose.mongo);
      gfs.collection('uploads');
    });

    db.once('error', err => console.error('Database status: Error', err));
    return db;
  } catch (error) {
    console.error(error);
  }
}

const database = { run };
export default database;
