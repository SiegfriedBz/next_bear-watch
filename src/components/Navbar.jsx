import { useSession, signIn, signOut } from 'next-auth/react'
import Logo from './Logo'
import Image from 'next/image'

const Navbar = () => {
  const { data: session, status } = useSession()
  const userName = session?.user?.name
  const userImage = session?.user?.image

  return (
    <div className='flex items-center justify-between px-2 py-4'>
      <Logo />
      <div>
        {status === 'loading' ? (
          <h1> loading... please wait</h1>
        ) : status === 'authenticated' ? (
          <div className='flex items-center space-x-4'>
            <h1>Hi {userName}</h1>
            <Image
              src={userImage}
              alt={userImage + ' photo'}
              width={50}
              height={50}
              className='rounded-full'
            />
            <button onClick={signOut}>Sign out</button>
          </div>
        ) : (
          <div
            className='flex cursor-pointer space-x-4'
            onClick={() => signIn('google')}
          >
            <Image
              src='/google_g_icon.png'
              alt={userImage + ' photo'}
              width={50}
              height={50}
              className='rounded-full'
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
