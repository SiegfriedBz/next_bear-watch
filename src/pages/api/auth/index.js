import { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// import and pass this to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
}

// Use it in server contexts
export function auth(...args) {
  return getServerSession(...args, config)
}
