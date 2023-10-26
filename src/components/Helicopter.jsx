import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHelicopter } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import ButtonHelp from './ButtonHelp'

const Helicopter = () => {
  const [helpIsOpened, setHelpIsOpened] = useState(false)

  return (
    <div
      id='help'
      className='fixed right-2 top-24 z-[99999] flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 p-2 ring-1 ring-warning'
    >
      <FontAwesomeIcon
        icon={faHelicopter}
        className='text-2xl font-extrabold text-warning'
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
