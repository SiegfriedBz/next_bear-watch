import { useCallback, useEffect, useState } from 'react'

const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState(undefined)

  const updateOrientation = useCallback(() => {
    setOrientation(getOrientation())
  }, [])

  useEffect(() => {
    setOrientation(getOrientation())
  }, [])

  useEffect(() => {
    if (!window?.screen?.orientation) return

    window.addEventListener('orientationchange', updateOrientation)

    return () => {
      window.removeEventListener('orientationchange', updateOrientation)
    }
  }, [updateOrientation])

  function getOrientation() {
    if (!window?.screen?.orientation) return

    return window.screen.orientation?.type?.split('-')?.[0]
  }

  return orientation
}

export default useScreenOrientation
