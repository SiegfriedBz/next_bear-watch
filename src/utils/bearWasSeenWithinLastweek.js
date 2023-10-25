import { isWithinInterval, subWeeks } from 'date-fns'

export const bearWasSeenWithinLastweek = (createdAt) => {
  return isWithinInterval(new Date(createdAt), {
    start: subWeeks(new Date(), 1),
    end: new Date(),
  })
}
