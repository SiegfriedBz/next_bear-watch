import { bearWasSeenWithinLastweek } from '@/utils/bearWasSeenWithinLastweek'
import { formatDistanceToNow } from 'date-fns'
import { Logo } from './Logo'

const MapPopup = ({ popup }) => {
  return (
    <div className='flex h-24 w-auto flex-col items-center justify-center rounded-md p-1'>
      <Logo
        className={
          bearWasSeenWithinLastweek(popup?.createdAt)
            ? 'h-12 w-12 rounded-full bg-warning-light/50 ring-2 ring-warning '
            : 'h-10 w-10 ring-2 ring-success'
        }
      />
      <p className='m-0 text-slate-900 dark:text-slate-900'>
        {formatDistanceToNow(new Date(popup?.createdAt))} ago
      </p>
    </div>
  )
}

export default MapPopup
