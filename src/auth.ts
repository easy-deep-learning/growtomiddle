import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

import clientPromise from '@/database/mongodbConnect';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [Google],
  // async signIn({ user, account, profile, email, credentials }) {
  //   return true;
  // },
  // async redirect({ url, baseUrl }) {
  //   return baseUrl;
  // },
  // async session({ session, token, user }) {
  //   console.log('>>> auth mongodb', { session, token, user });
  //   return session;
  // },
  // async jwt({ token, user, account, profile, isNewUser }) {
  //   return token;
  // },
});
