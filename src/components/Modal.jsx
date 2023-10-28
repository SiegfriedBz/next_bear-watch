import NavLinks from './NavLinks'
import { motion, AnimatePresence } from 'framer-motion'

const Modal = ({ modalIsOpen, closeModal }) => {
  return (
    <AnimatePresence>
      {modalIsOpen && (
        <motion.div
          variants={modalBackdropVariants}
          initial='hidden'
          animate={modalIsOpen ? 'visible' : ''}
          exit='exit'
          onClick={closeModal}
          className='fixed bottom-0 left-0 right-0 top-0 z-[950] backdrop-blur-md'
        >
          <motion.div
            variants={modalWrapperVariants}
            initial='hidden'
            animate={modalIsOpen ? 'visible' : ''}
            exit='exit'
            className='absolute 
                bottom-0 left-0
                right-0 top-0
                flex h-screen w-full
                -translate-y-1/2
                items-center justify-center'
          >
            <ModalMenu className={modalIsOpen ? 'z-[999]' : 'z-0'}>
              <div className='w-full py-1'>
                <NavLinks closeModal={closeModal} />
              </div>
            </ModalMenu>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal

const ModalMenu = ({ children }) => {
  return (
    <div
      className='mx-4 flex w-full flex-col
        items-center justify-center
        rounded-lg
        border 
        border-slate-900
        bg-stone-100/50
        p-4
        opacity-50 
        shadow-sm shadow-slate-900
        dark:border-stone-100 dark:bg-slate-900/50
        dark:shadow-sm dark:shadow-stone-100
        sm:mx-12 md:mx-24 2xl:hidden'
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
}

const modalBackdropVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
  },
}

const modalWrapperVariants = {
  hidden: {
    opacity: 0,
    y: '-100vh',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      type: 'spring',
      stiffness: 200,
      damping: 10,
    },
  },
  exit: {
    y: '100vh',
  },
}
