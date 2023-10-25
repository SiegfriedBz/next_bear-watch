import Image from 'next/image'

const Logo = () => {
  return (
    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-white'>
      <Image src='/bear-logo.png' alt='Bear Logo' width={50} height={50} />
    </div>
  )
}

export default Logo
