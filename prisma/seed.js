import { prisma } from '../server/db/prismaClient'
import { BEAR_MARKERS } from '@/data/bearMarkers'

async function main() {
  if (process.env.NODE_ENV === 'development') {
    console.log('===')
    console.log('Clearing DB...')
    await prisma.marker.deleteMany()
    console.log('Clearing DB...DONE')

    console.log('===')
    console.log('Seeding DB...')
    const bearMarkers = await prisma.marker.createMany({
      data: [
        {
          ...BEAR_MARKERS[0],
        },
        {
          ...BEAR_MARKERS[1],
        },
        {
          ...BEAR_MARKERS[2],
        },
        {
          ...BEAR_MARKERS[3],
        },
      ],
    })

    console.log('Seeding DB...DONE')
    console.log('bearMarkers', bearMarkers)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
