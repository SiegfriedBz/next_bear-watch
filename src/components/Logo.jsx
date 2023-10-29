import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export const LogoLink = ({ className = '', smallLogo = false }) => {
  return (
    <Link href='/' target='_self'>
      <Logo className={className} smallLogo={smallLogo} />
    </Link>
  )
}

export const Logo = ({ className = '', smallLogo = false }) => {
  return (
    <span
      className={twMerge(
        'inline-flex h-11 w-11 items-center justify-center rounded-full',
        className
      )}
    >
      <span className={smallLogo ? 'hidden dark:block' : 'dark:hidden'}>
        <Image
          src='/logo-black.png'
          alt='Bear Logo Black'
          width={50}
          height={50}
          priority
          className='px-1'
        />
      </span>
      <span className={smallLogo ? 'dark:hidden' : 'hidden dark:block'}>
        <Image
          src='/logo-white.png'
          alt='Bear Logo White'
          width={50}
          height={50}
          priority
          className='px-1'
        />
      </span>
    </span>
  )
}
