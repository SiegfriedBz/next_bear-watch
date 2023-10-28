import { useAppContext } from '@/context/appContext'
import { AnimatePresence, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHelicopter } from '@fortawesome/free-solid-svg-icons'
import ButtonHelp from './ButtonHelp'

const Helicopter = () => {
  const { helpIsOpened, setHelpIsOpened } = useAppContext()

  return (
    <div
      id='help'
      className={`fixed right-2 top-[5.45rem] z-[99999] flex h-10 w-10 items-center justify-center rounded-full p-2 transition duration-500 ease-in-out  ${
        helpIsOpened
          ? 'bg-transparent ring-0'
          : 'bg-stone-100 ring-1 ring-warning'
      }`}
    >
      <FontAwesomeIcon
        icon={faHelicopter}
        className={`text-2xl font-extrabold text-warning ${
          helpIsOpened ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={() => setHelpIsOpened(true)}
      />
      <AnimatePresence>
        {helpIsOpened && (
          <motion.div
            className='absolute right-1/2 top-1/2 h-[90px] w-[90px] rounded-full bg-gray-200 ring-2 ring-warning'
            initial={{ scale: 0, x: 45, y: -45 }}
            animate={{ scale: 1.5, x: 0, y: 0 }}
            exit={{ scale: 0, x: 45, y: -45 }}
            transition={{
              duration: 0.5,
              type: 'spring',
              stiffness: 360,
              damping: 20,
            }}
          >
            <div className='relative h-full w-full'>
              <ButtonHelp setHelpIsOpened={setHelpIsOpened} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Helicopter
