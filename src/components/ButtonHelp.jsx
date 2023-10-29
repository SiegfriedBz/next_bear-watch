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
        type: 'info',
        message: 'Please sign-in to be able to get help',
      })
      return
    }

    if (!friendWhatsapp) {
      setHelpIsOpened(false)
      setHelpLinkHref(null)
      router.push('/my-profile')
      handleToast({
        type: 'info',
        message:
          "Please add a friend's WhatsApp number to your profile, to be able to get help.",
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
        type: 'info',
        message: `Please allow location access on your device`,
      })
      console.log(error)
    }
  }

  return (
    <>
      {helpLinkHref == null ? (
        <div className='bg-cfg-white flex h-full w-full flex-col items-center justify-center rounded-full p-2 '>
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
        <div className='ring-cfg-white flex h-full w-full flex-col items-center justify-center rounded-full bg-warning p-2 ring-2'>
          <Link
            href={helpLinkHref}
            target={'_blank'}
            className='text-cfg-white text-lg'
          >
            Confirm
          </Link>
          <button
            className='text-cfg-white/50 text-sm'
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
