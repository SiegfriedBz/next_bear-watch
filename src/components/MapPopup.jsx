import { bearWasSeenWithinLastweek } from '@/utils/bearWasSeenWithinLastweek'
import { formatDistanceToNow } from 'date-fns'
import Logo from './Logo'

const MapPopup = ({ popup }) => {
  return (
    <div className='flex h-16 w-auto flex-col items-center justify-center'>
      <Logo
        className={
          bearWasSeenWithinLastweek(popup?.createdAt)
            ? 'h-12 w-12 rounded-full bg-red-200 ring-2 ring-red-500'
            : 'h-10 w-10 ring-2 ring-green-500'
        }
      />
      <p className='text-slate-900 dark:text-slate-900'>
        {formatDistanceToNow(new Date(popup?.createdAt))} ago
      </p>
    </div>
  )
}

export default MapPopup
