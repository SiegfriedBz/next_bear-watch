import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { LogoLink } from './Logo'
import ButtonToggleTheme from './ButtonToggleTheme'
import ButtonMobileBurger from './ButtonMobileBurger'
import Modal from './Modal'

const Navbar = () => {
  const router = useRouter()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { data: session, status } = useSession()
  const username = session?.user?.name?.split(' ')?.[0]
  const isLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated'

  const isHomePage =
    router.pathname === '/' ||
    router.pathname === '/#features' ||
    router.pathname === '/#map'

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <motion.header
      variants={variants}
      initial={isHomePage ? 'hidden' : 'visible'}
      animate='visible'
      id='header'
      className='layout-gradient fixed left-0 right-0 top-0 z-[999] border-b px-2'
    >
      <div className='relative flex h-full w-full items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <span className='ring-cfg-black dark:ring-cfg-white rounded-full ring-1 dark:ring-2'>
            <LogoLink />
          </span>

          {!isAuthenticated && (
            <Link id='brand-link' href='/' target='_self'>
              <span className='whitespace-nowrap text-lg font-bold italic'>
                Bear Watch
              </span>
            </Link>
          )}
        </div>

        <div className='absolute left-1/2 flex -translate-x-1/2 items-center justify-center space-x-4'>
          {isAuthenticated && username && (
            <div className='flex space-x-4'>
              <span className='whitespace-nowrap text-lg font-bold italic'>
                Hi {username}!
              </span>
              <button onClick={() => signOut({ callbackUrl: '/' })}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className='flex items-center justify-center space-x-2'>
            <div className='bg-cfg-white h-2 w-2 animate-pulse rounded-full'></div>
            <div className='bg-cfg-white h-2 w-2 animate-pulse rounded-full'></div>
            <div className='bg-cfg-white h-2 w-2 animate-pulse rounded-full'></div>
          </div>
        ) : !isAuthenticated ? (
          <button
            onClick={() => signIn({ callbackUrl: '/' })}
            className='whitespace-nowrap text-lg font-bold italic'
          >
            Sign in
          </button>
        ) : null}

        <div className='flex items-center space-x-4'>
          <ButtonToggleTheme />

          <ButtonMobileBurger
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
          />
        </div>
      </div>

      {/* backdrop & menu */}
      <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </motion.header>
  )
}

export default Navbar

const variants = {
  hidden: {
    y: '-100',
    opacity: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.1,
      duration: 0.7,
    },
  },
}
