// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from 'next-auth'
import { prisma } from '../../../server/db/prismaClient'
import { authOptions } from './auth/[...nextauth]'

// Protected API ROUTE
export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions)

  console.log('handle(req, res)')

  if (!session) {
    res.status(401).json({ message: 'You must be logged in.' })
    return
  }

  console.log(req)

  const prismaUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const marker = await prisma.marker.create({
          data: {
            ...req.body,
            user: {
              connect: {
                id: prismaUser.id,
              },
            },
          },
        })

        res.status(201).json(marker)
      } catch (error) {
        res.status(500).json({ error })
      }
      break
    case 'DELETE':
      const { id } = req.query

      try {
        const marker = await prisma.marker.delete({
          where: {
            id: id,
          },
        })

        res.status(200).json(marker)
      } catch (error) {
        res.status(500).json({ error })
      }
      break
    default:
      res.setHeader('Allow', ['POST', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
