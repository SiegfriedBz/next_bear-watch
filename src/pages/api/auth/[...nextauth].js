import NextAuth from 'next-auth'
import { config } from './index'

export const authOptions = {
  ...config,
}

export default NextAuth(authOptions)
