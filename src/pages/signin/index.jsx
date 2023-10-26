import PageLayout from '@/components/layouts/PageLayout'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

const Signin = () => {
  return (
    <PageLayout>
      <div className='layout-gradient flex flex-col items-center justify-center pb-80'>
        <h2 className='text-3xl'>Sign in</h2>

        <div
          className='flex cursor-pointer items-center justify-center space-x-4'
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          <h3 className='font-semibold'>Sign in with Google</h3>
          <Image
            src='/google_g_icon.png'
            alt='Google Icon'
            width={35}
            height={35}
            className='rounded-full'
          />
        </div>
      </div>
    </PageLayout>
  )
}

export default Signin
