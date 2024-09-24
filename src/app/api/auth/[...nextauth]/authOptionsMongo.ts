import { NextAuthOptions } from 'next-auth'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/database/mongodbConnect'
import { Adapter } from 'next-auth/adapters'
import { authCommonOptions } from '@/authCommonOptions'

export const maxDuration = 60

export const authOptionsMongo: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  ...authCommonOptions,
}
