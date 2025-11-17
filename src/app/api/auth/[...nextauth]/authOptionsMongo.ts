import { authCommonOptions } from '@/authCommonOptions';
import clientPromise from '@/database/mongodbConnect';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';

export const maxDuration = 60;

export const authOptionsMongo: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  ...authCommonOptions,
};
