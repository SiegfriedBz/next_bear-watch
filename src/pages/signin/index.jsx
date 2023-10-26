import { signIn } from 'next-auth/react'
import Image from 'next/image'

const Signin = () => {
  return (
    <div
      className='flex cursor-pointer items-center justify-center space-x-4'
      onClick={() => signIn('google', { callbackUrl: '/' })}
    >
      Sign in with Google
      <Image
        src='/google_g_icon.png'
        alt='Google Icon'
        width={50}
        height={50}
        className='rounded-full'
      />
    </div>
  )
}

export default Signin
