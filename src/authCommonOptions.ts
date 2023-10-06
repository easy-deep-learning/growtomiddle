import { Session } from 'next-auth'
import VKProvider from 'next-auth/providers/vk'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

export const authCommonOptions = {
  // Configure one or more authentication providers
  providers: [
    /*
    // @see https://vk.com/editapp?id=51704776
    VKProvider({
      clientId: process.env.VK_ID as string,
      clientSecret: process.env.VK_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),*/
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // @ts-ignore
    session: ({ session, user }): Session => {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
}
