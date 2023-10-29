import { GithubIconLink, LinkedinIconLink } from './Icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { LogoLink } from './Logo'

const Footer = () => {
  return (
    <footer id='footer' className='layout-gradient border-t px-2 py-4'>
      <div id='footer-top' className='flex items-center justify-between'>
        {/* brand */}
        <div id='footer-brand' className='flex items-center space-x-2'>
          <LogoLink className='dark:ring-cfg-white ring-cfg-black h-8 w-8 ring-1' />

          <Link id='brand-link' href='/' target='_self'>
            <span className='whitespace-nowrap text-lg font-bold italic'>
              Bear Watch
            </span>
          </Link>
        </div>

        {/* icons */}
        <div
          id='footer-icons'
          className='flex items-center justify-between gap-x-4'
        >
          <GithubIconLink />
          <LinkedinIconLink />
        </div>
      </div>

      {/* credits */}
      <div id='footer-credits'>
        <h2 className='text-cfg-black dark:text-cfg-white mt-5 text-center text-sm'>
          <span>
            &copy;{new Date().getFullYear()} Bear Watch All Rights Reserved.
          </span>
        </h2>

        <div className='mb-0 flex w-full flex-row items-center justify-center'>
          Build with
          <span className='px-2 '>
            <FontAwesomeIcon
              icon={faHeartPulse}
              className='w-4
              text-warning dark:text-warning-light'
            />
          </span>
          by
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
            target='_blank'
            className='mx-2 
             transition-["scale"] duration-300 hover:scale-105'
          >
            SiegfriedB
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
