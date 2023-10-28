import { useState, useLayoutEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDown } from '@fortawesome/free-solid-svg-icons'

const MotionButton = motion.button

const Hero = () => {
  const router = useRouter()
  const heroRef = useRef(null)
  const [isClient, setIsClient] = useState(false)
  const [viewportOffset, setViewportOffset] = useState(0)
  const [arrowIsClicked, setArrowIsClicked] = useState(false)

  // set hero height to viewport height on client
  const setHeroHeight = useCallback(() => {
    if (!isClient) return

    const adjustedHeroHeight = window.outerHeight - viewportOffset
    heroRef.current.style.height = `${adjustedHeroHeight}px`
  }, [viewportOffset, isClient])

  // 2. client-side set hero height to user viewport height before first render
  useLayoutEffect(() => {
    setIsClient(true)
    setViewportOffset(window.outerHeight - window.innerHeight)
    setHeroHeight()
  }, [setHeroHeight])

  // 1. server-side render image h-screen (reserve space for hero image)
  if (!isClient) {
    return (
      <div className='h-[100vh] w-full'>
        <div
          id='hero-image-server'
          className='hero-image h-full opacity-100'
        ></div>
      </div>
    )
  }

  // 3. render full hero section on client with adjusted height
  return (
    <div
      ref={heroRef}
      className={`flex max-h-[100vh] w-full flex-col items-center justify-between`}
    >
      <div id='hero-image' className='hero-image h-full opacity-100'></div>

      <div className='hero-text-wrapper'>
        <motion.h2
          variants={h2AVariants}
          initial='hidden'
          animate='show'
          className='text-3xl font-extrabold'
        >
          Bear Sighting Map
        </motion.h2>
        <motion.h2
          variants={h2BVariants}
          initial='hidden'
          animate='show'
          className='text-3xl font-extrabold'
        >
          Report Bear Encounters
        </motion.h2>
        <motion.h2
          variants={h2CVariants}
          initial='hidden'
          animate='show'
          className='text-3xl font-extrabold'
        >
          Send SOS Message
        </motion.h2>
      </div>

      <MotionButton
        variants={arrowVariants}
        initial='hidden'
        animate='visible'
        onClick={() => {
          setArrowIsClicked((prev) => !prev)
          router.push('#features')
        }}
        className={`absolute bottom-1 z-[500] cursor-pointer text-success dark:text-stone-100/90 ${
          arrowIsClicked ? 'animate-none' : 'animate-bounce'
        }`}
      >
        <FontAwesomeIcon
          icon={faCircleDown}
          className='rounded-full bg-transparent text-4xl ring-2 ring-stone-100 dark:bg-slate-900 dark:bg-transparent dark:ring-success'
        />
      </MotionButton>
    </div>
  )
}

export default Hero

const h2AVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 1.4,
      duration: 0.8,
    },
  },
}
const h2BVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 2.2,
      duration: 0.8,
    },
  },
}
const h2CVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 3,
      duration: 0.8,
    },
  },
}

const arrowVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 4.3,
      duration: 0.3,
    },
  },
}
