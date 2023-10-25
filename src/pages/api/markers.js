// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from 'next-auth'
import { prisma } from '../../../server/db/prismaClient'
import { authOptions } from './auth/[...nextauth]'

// Protected API ROUTE
export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: 'You must be logged in.' })
    return
  }

  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const marker = await prisma.marker.create({
          data: {
            ...req.body,
          },
        })
        res.status(201).json(marker)
      } catch (error) {
        res.status(500).json({ error })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
