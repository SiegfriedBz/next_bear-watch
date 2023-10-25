import NextAuth from 'next-auth'
import { config } from './index'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '../../../../server/db/prismaClient'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  ...config,
}

export default NextAuth(authOptions)
