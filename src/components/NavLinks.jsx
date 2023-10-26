import Link from 'next/link'

const NAV_LINKS = [
  {
    id: 1,
    href: '/profile',
    text: 'Your Profile',
  },
  {
    id: 2,
    href: '/signin',
    text: 'Sign-in with Google',
  },
  {
    id: 3,
    href: '/about',
    text: 'About',
  },
  {
    id: 4,
    href: '/privacy-policy',
    text: 'Privacy policy',
  },
  {
    id: 5,
    href: '/tos',
    text: 'Terms of Service',
  },
]

const NavLinks = ({ className = '', modal = false, closeModal }) => {
  return (
    <ul
      className={`${
        modal ? 'flex-col' : 'justify-end space-x-4'
      } flex h-full w-full items-center ${className}`}
    >
      {/* nav links */}
      {NAV_LINKS?.map((link) => {
        return (
          <Li
            key={link.id}
            href={link.href}
            className={link.className}
            modal={modal}
            closeModal={closeModal}
          >
            {link.text}
          </Li>
        )
      })}
    </ul>
  )
}

export default NavLinks

const Li = ({
  className = '',
  href = '',
  modal = false,
  closeModal,
  children,
}) => {
  return (
    <li
      className={className}
      onClick={() => {
        modal && closeModal()
      }}
    >
      <Link
        href={href}
        target='_self'
        className='my-2 inline-block text-2xl font-bold'
      >
        {children}
      </Link>
    </li>
  )
}
