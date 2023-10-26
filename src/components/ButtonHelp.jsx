import { useToastContext } from '@/context/toastContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const ButtonHelp = ({ user }) => {
  const router = useRouter()
  const { handleToast } = useToastContext()
  const [helpLink, setHelpLink] = useState(null)
  const bloodGroup = user?.bloodGroup
  const friendWhatsapp = user?.friendWhatsappNumber

  const handleHelp = async () => {
    if (!user) {
      router.push('/signin')
      return
    }

    try {
      const { latitude, longitude } = await getUserLocation()
      const string = `Hi, this is ${user?.name}.
        I have been attacked by a bear.
        My blood group is ${bloodGroup}.

        Here is a link to my current location:
        https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}
        
        Please help me.`
      const encodedString = encodeURIComponent(string)

      setHelpLink(`https://wa.me/${friendWhatsapp}?text=${encodedString}`)
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
    <div className='flex justify-center'>
      {!helpLink ? (
        <button
          className='text-warning ring-warning hover:bg-warning my-4 rounded-xl bg-white px-4 py-2 text-3xl ring-2 transition-all duration-300 hover:text-white'
          onClick={handleHelp}
        >
          Get Help
        </button>
      ) : (
        <Link
          href={helpLink}
          className='text-warning ring-warning hover:bg-warning my-4 rounded-xl bg-white px-4 py-2 text-3xl ring-2 transition-all duration-300 hover:text-white'
        >
          Confirm
        </Link>
      )}
    </div>
  )
}

export default ButtonHelp
