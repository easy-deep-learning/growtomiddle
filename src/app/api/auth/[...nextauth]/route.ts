import NextAuth from 'next-auth'

import { authOptionsMongo } from './authOptionsMongo'

const handler = NextAuth(authOptionsMongo)
export { handler as GET, handler as POST }
