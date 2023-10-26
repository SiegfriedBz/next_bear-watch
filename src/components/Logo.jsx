import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

const Logo = ({ className = '' }) => {
  return (
    <Link
      href='/'
      target='_self'
      className={twMerge(
        'flex h-14 w-14 items-center justify-center rounded-full bg-white ring-2 ring-slate-900',
        className
      )}
    >
      <Image
        src='/bear-logo.png'
        alt='Bear Logo'
        width={50}
        height={50}
        priority
      />
    </Link>
  )
}

export default Logo
