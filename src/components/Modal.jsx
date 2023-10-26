import { motion } from 'framer-motion'

const Modal = ({ modalIsOpen, closeModal, className, children }) => {
  return (
    <motion.div
      id='backdrop'
      className={`${className} fixed 
        bottom-0 left-0
        right-0 top-1/2
        flex h-screen w-full
        -translate-y-1/2
        items-center justify-center backdrop-blur-md
        `}
      initial={{ opacity: 0 }}
      animate={modalIsOpen ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      onClick={closeModal}
    >
      <ModalMenu modalIsOpen={modalIsOpen}>{children}</ModalMenu>
    </motion.div>
  )
}

export default Modal

const modalMenuVariants = {
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

const ModalMenu = ({ modalIsOpen, children }) => {
  return (
    <motion.div
      variants={modalMenuVariants}
      initial='hidden'
      animate={modalIsOpen ? 'visible' : ''}
      exit='exit'
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
    </motion.div>
  )
}
