import mongoose, { ConnectOptions } from 'mongoose';

export const maxDuration = 60;

const { MONGODB_URI = '' } = process.env;

if (MONGODB_URI === '') {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/**
 * @see https://mongoosejs.com/docs/index.html
 */

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
type MongoConnectionsCached = {
  connection: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose | null> | null;
};

let cached: MongoConnectionsCached = { connection: null, promise: null };

export default async function dbConnect() {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    /**
     * @see https://mongoosejs.com/docs/connections.html
     * @see http://mongodb.github.io/node-mongodb-native/2.2/api/MongoClient.html#connect
     * ConnectOptions
     */
    const options: ConnectOptions = {};

    mongoose.connection.on('error', (err) => {
      console.error('Connection error:', err);
    });

    const uri = `${process.env.MONGODB_URI}/${process.env.MONGODB_DB}?authSource=${process.env.MONGODB_AUTH_DB}`;

    cached.promise = mongoose.connect(uri, options).catch((error) => {
      console.error('Connection established error:', error);
      return null;
    });

    cached.connection = await cached.promise;
    return cached.connection;
  }
}
