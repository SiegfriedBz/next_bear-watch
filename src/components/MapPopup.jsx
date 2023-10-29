import { formatDistanceToNow } from 'date-fns'
import { bearWasSeenWithinLastweek } from '@/utils/bearWasSeenWithinLastweek'
import { Logo } from './Logo'

const MapPopup = ({ popup, isMapEditMode, onDeleteBearMarker }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center 
      space-y-1
      rounded-lg
      border-2
      p-2 
      shadow-sm
      ${
        bearWasSeenWithinLastweek(popup?.createdAt)
          ? 'border-warning  shadow-warning dark:border-warning-light dark:shadow-warning-light'
          : 'border-primary  shadow-primary dark:border-primary-light dark:shadow-primary-light'
      }
      `}
    >
      <div className='flex flex-col items-center space-y-2 '>
        <div className='rounded-full'>
          <Logo
            className={`ring-2 ${
              bearWasSeenWithinLastweek(popup?.createdAt)
                ? 'h-12 w-12 bg-warning-light/50 ring-warning '
                : 'h-10 w-10 ring-primary'
            }`}
          />
        </div>
        <p className='text-cfg-black/80 dark:text-cfg-black/80 m-0 text-center italic'>
          Seen {formatDistanceToNow(new Date(popup?.createdAt))} ago
        </p>
      </div>

      {/* delete marker btn */}
      {isMapEditMode && (
        <button
          className='
            bg-secondary
            hover:shadow-secondary-light
            focus:shadow-secondary-light
            dark:bg-secondary-light
              w-1/8

            text-cfg-white 
            dark:text-cfg-white

            rounded-lg

            border
            px-2
            py-1
            text-lg
            font-extrabold tracking-wider transition 
            duration-300 hover:scale-105
            hover:shadow-sm 
            focus:scale-105
            focus:shadow-sm
            '
          onClick={() => {
            onDeleteBearMarker(popup?.id)
          }}
        >
          Delete
        </button>
      )}
    </div>
  )
}

export default MapPopup
