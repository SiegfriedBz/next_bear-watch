import { useAppContext } from '@/context/appContext'
import { getUserLocation } from '@/utils/getUserLocation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const ButtonHelp = ({ setHelpIsOpened }) => {
  const router = useRouter()
  const { user, handleToast } = useAppContext()
  const [helpLinkHref, setHelpLinkHref] = useState(null)

  const bloodGroup = user?.bloodGroup
  const friendWhatsapp = user?.friendWhatsappNumber

  const handleGetHelp = async () => {
    if (!user) {
      setHelpIsOpened(false)
      setHelpLinkHref(null)
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
        message: `${error.message}, Please allow location access`,
      })
      console.log(error)
    }
  }

  return (
    <>
      {helpLinkHref == null ? (
        <div className='flex h-full w-full flex-col items-center justify-center rounded-full bg-stone-100 p-2 '>
          <button
            onClick={handleGetHelp}
            className='space-nowrap text-lg text-warning'
          >
            Get Help
          </button>
          <button
            className='text-sm text-warning/50'
            onClick={(e) => {
              e.stopPropagation()
              setHelpLinkHref(null)
              setHelpIsOpened(false)
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className='flex h-full w-full flex-col items-center justify-center rounded-full bg-warning p-2 ring-2 ring-stone-100'>
          <Link
            href={helpLinkHref}
            target={'_blank'}
            className='text-lg text-stone-100'
          >
            Confirm
          </Link>
          <button
            className='text-sm text-stone-100/50'
            onClick={(e) => {
              e.stopPropagation()
              setHelpLinkHref(null)
              setHelpIsOpened(false)
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  )
}

export default ButtonHelp
