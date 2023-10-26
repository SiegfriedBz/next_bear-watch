import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export const LogoLink = ({ className = '' }) => {
  return (
    <Link href='/' target='_self'>
      <Logo className={className} />
    </Link>
  )
}

export const Logo = ({ className = '' }) => {
  return (
    <span
      className={twMerge(
        'inline-flex h-11 w-11 items-center justify-center rounded-full bg-white ring-2 ring-slate-900',
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
    </span>
  )
}
