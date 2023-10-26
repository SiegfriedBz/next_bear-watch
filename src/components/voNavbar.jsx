import { useSession, signIn, signOut } from 'next-auth/react'
import { LogoLink } from './Logo'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const Navbar = () => {
  const { data: session, status } = useSession()
  const userName = session?.user?.name
  const userImage = session?.user?.image

  return (
    <div className='relative flex items-center justify-between px-2 py-4'>
      <LogoLink />
      {!userName && <h1 className='text-2xl font-bold italic'>Bear Watch</h1>}
      <div>
        {status === 'loading' ? (
          <h1> loading... please wait</h1>
        ) : status === 'authenticated' ? (
          <div className='flex items-center space-x-4'>
            <h1 className=''>Hi {userName?.split(' ')?.[0] || userName}!</h1>
            <Link href='/profile'>Profile</Link>
            <Image
              src={userImage}
              alt={userImage + ' photo'}
              width={35}
              height={35}
              className='rounded-full'
            />
            <button onClick={() => signOut({ callbackUrl: '/' })}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          </div>
        ) : (
          <div
            className='flex cursor-pointer space-x-4'
            onClick={() => signIn('google', { callbackUrl: '/' })}
          >
            <Image
              src='/google_g_icon.png'
              alt={userImage + ' photo'}
              width={35}
              height={35}
              className='rounded-full'
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
