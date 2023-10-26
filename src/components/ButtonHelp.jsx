import { useAppContext } from '@/context/appContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const ButtonHelp = ({ setHelpIsOpened }) => {
  const { user } = useAppContext()

  const router = useRouter()
  const { handleToast } = useAppContext()
  const [helpLinkHref, setHelpLinkHref] = useState(null)

  const bloodGroup = user?.bloodGroup
  const friendWhatsapp = user?.friendWhatsappNumber

  const handleGetHelp = async () => {
    if (!user) {
      setHelpIsOpened(false)
      setHelpLinkHref(null)
      router.push('/signin')
      handleToast({
        type: 'error',
        message: 'Please sign-in to be able to get help',
      })
      return
    }

    if (!friendWhatsapp) {
      setHelpIsOpened(false)
      setHelpLinkHref(null)
      router.push('/profile')
      handleToast({
        type: 'error',
        message:
          'Please fill-in a friend WhatsApp number in your profile, to be able to get help',
      })
      return
    }

    try {
      const { latitude, longitude } = await getUserLocation()
      const string = `
        Hi, this is ${user?.name}.

        I've been attacked by a bear. A real.

        My blood group is ${bloodGroup}.

        Link to my current location:
        https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}
        
        Please help me!`

      const encodedString = encodeURIComponent(string)

      setHelpLinkHref(`https://wa.me/${friendWhatsapp}?text=${encodedString}`)
    } catch (error) {
      handleToast({
        type: 'error',
        message: `${error.message}, 'Please allow location access'`,
      })
      console.log(error)
    }
  }

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords)
        },
        (error) => {
          reject(error)
        },
        {
          timeout: 10000,
        }
      )
    })
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-center rounded-full bg-white p-2 text-xl text-warning  transition-all duration-300 hover:bg-warning hover:text-white'>
      {helpLinkHref == null ? (
        <>
          <button onClick={handleGetHelp} className='whitespace-nowrap'>
            Get Help
          </button>
          <button
            className='text-sm'
            onClick={(e) => {
              e.stopPropagation()
              setHelpLinkHref(null)
              setHelpIsOpened(false)
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <Link href={helpLinkHref} target={'_blank'}>
            Confirm
          </Link>
          <button
            className='text-sm'
            onClick={(e) => {
              e.stopPropagation()
              setHelpLinkHref(null)
              setHelpIsOpened(false)
            }}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  )
}

export default ButtonHelp
