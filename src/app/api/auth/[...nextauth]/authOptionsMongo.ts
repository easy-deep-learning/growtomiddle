import { authCommonOptions } from '@/authCommonOptions';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';

import clientPromise from '@/database/mongodbConnect';

export const maxDuration = 60;

export const authOptionsMongo: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  ...authCommonOptions,
};
