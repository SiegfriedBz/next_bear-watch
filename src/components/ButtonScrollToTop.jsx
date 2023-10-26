import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons'

const ButtonScrollToTop = ({
  scrollToTop,
  bottomPageBtn = false,
  homeBottomPageBtn = false,
}) => {
  const bottom = homeBottomPageBtn
    ? '-bottom-[5.15rem]'
    : bottomPageBtn
    ? '-bottom-[3.25rem]'
    : 'bottom-[0.35rem]'

  return (
    <FontAwesomeIcon
      icon={faCircleArrowUp}
      onClick={scrollToTop}
      className={`${bottom} text-success-light hover:text-success-light absolute right-0 cursor-pointer text-2xl transition-all`}
    />
  )
}

export default ButtonScrollToTop
