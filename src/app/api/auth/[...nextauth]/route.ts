import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { Adapter } from "next-auth/adapters";

import clientPromise from '@/database/mongodbConnect'

import { authCommonOptions } from '@/authCommonOptions'

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  ...authCommonOptions,
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
