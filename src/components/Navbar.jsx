import { useState } from 'react'
import Link from 'next/link'
import Logo from './Logo'
import NavLinks from './NavLinks'
import ButtonToggleTheme from './ButtonToggleTheme'
import ButtonMobileBurger from './ButtonMobileBurger'
import Modal from './Modal'

const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <header
      id='header'
      className='layout-gradient fixed left-0 right-0 top-0 z-[999] border-b px-2 py-4'
    >
      <div className='flex h-full items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Logo />
          <Link id='brand-link' href='/' target='_self'>
            <span className='whitespace-nowrap text-xl font-bold italic'>
              Bear Watch
            </span>
          </Link>
        </div>

        <div className='flex items-center justify-end space-x-4'>
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
