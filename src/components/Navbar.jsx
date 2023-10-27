import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { LogoLink } from './Logo'
import NavLinks from './NavLinks'
import ButtonToggleTheme from './ButtonToggleTheme'
import ButtonMobileBurger from './ButtonMobileBurger'
import Modal from './Modal'

const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { data: session, status } = useSession()
  const username = session?.user?.name?.split(' ')?.[0]

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <header
      id='header'
      className='layout-gradient fixed left-0 right-0 top-0 z-[999] border-b px-2 py-4'
    >
      <div className='relative flex h-full w-full items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <LogoLink />
          {!username && (
            <Link id='brand-link' href='/' target='_self'>
              <span className='whitespace-nowrap text-lg font-bold italic'>
                Bear Watch
              </span>
            </Link>
          )}
        </div>

        <div className='absolute left-1/2 flex -translate-x-1/2 items-center justify-center space-x-4'>
          {username && (
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

        {!username && (
          <button
            onClick={() => signIn({ callbackUrl: '/' })}
            className='whitespace-nowrap text-lg font-bold italic'
          >
            Sign in
          </button>
        )}

        <div className='flex items-center space-x-4'>
          <ButtonToggleTheme />

          <ButtonMobileBurger
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
          />
        </div>
      </div>

      {/* backdrop & menu */}
      {modalIsOpen && (
        <Modal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          className={modalIsOpen ? 'z-[999]' : 'z-0'}
        >
          <div className='w-full py-1'>
            <NavLinks modal={true} closeModal={closeModal} />
          </div>
        </Modal>
      )}
    </header>
  )
}

export default Navbar
