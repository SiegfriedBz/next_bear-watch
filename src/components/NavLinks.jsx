import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'

const NAV_LINKS = [
  {
    id: 1,
    href: '/profile',
    text: 'Your Profile',
  },
  {
    id: 2,
    href: '/#map',
    text: 'Explore Bear Sightings',
  },

  {
    id: 3,
    href: '/privacy-policy',
    text: 'Privacy policy',
  },
  {
    id: 4,
    href: '/tos',
    text: 'Terms of Service',
  },
  {
    id: 5,
    href: '/about',
    text: 'About',
  },
]

const NavLinks = ({ className = '', closeModal }) => {
  const { status } = useSession()

  // enforce sign-in to access profile page
  const checkIfAuthenticated = () => {
    return status === 'unauthenticated'
      ? signIn('google', { callbackUrl: '/profile' })
      : closeModal()
  }

  return (
    <ul className={`flex h-full w-full flex-col items-center ${className}`}>
      {NAV_LINKS?.map((link) => {
        return (
          <Li
            key={link.id}
            href={link.href}
            onClick={() => {
              link.href === '/profile' ? checkIfAuthenticated() : closeModal()
            }}
          >
            {link.text}
          </Li>
        )
      })}
    </ul>
  )
}

export default NavLinks

const Li = ({ href = '', onClick, children }) => {
  return (
    <li onClick={onClick}>
      <Link
        href={href}
        target='_self'
        className='my-2 inline-block text-2xl font-extrabold'
      >
        {children}
      </Link>
    </li>
  )
}
