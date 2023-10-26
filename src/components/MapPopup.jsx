import { bearWasSeenWithinLastweek } from '@/utils/bearWasSeenWithinLastweek'
import { formatDistanceToNow } from 'date-fns'
import Logo from './Logo'

const MapPopup = ({ popup }) => {
  return (
    <div className='flex h-16 w-auto flex-col items-center justify-center'>
      <Logo
        className={
          bearWasSeenWithinLastweek(popup?.createdAt)
            ? 'ring-warning bg-warning-light h-12 w-12 rounded-full ring-2'
            : 'ring-success h-10 w-10 ring-2'
        }
      />
      <p className='text-slate-900 dark:text-slate-900'>
        {formatDistanceToNow(new Date(popup?.createdAt))} ago
      </p>
    </div>
  )
}

export default MapPopup
