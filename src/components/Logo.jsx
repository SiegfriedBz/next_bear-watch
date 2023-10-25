import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

const Logo = ({ className = '' }) => {
  return (
    <div
      className={twMerge(
        'flex h-14 w-14 items-center justify-center rounded-full bg-white',
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
    </div>
  )
}

export default Logo
