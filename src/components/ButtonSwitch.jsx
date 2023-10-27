import { useId } from 'react'
import { twMerge } from 'tailwind-merge'

// trick tailwind
const possibleLabelContentClasses = [
  'after:content-["Edit_mode"]',
  'after:content-["Filter_map"]',
  'after:content-["Center_Map"]',
]

const ButtonSwitch = ({ label, isChecked, onChange, className = '' }) => {
  const switchId = useId()

  const labelContentClass =
    label === 'Edit_Mode'
      ? 'after:content-["Edit_mode"]'
      : label === 'Filter_Map'
      ? 'after:content-["Filter_map"]'
      : label === 'Center_Map'
      ? 'after:content-["Center_Map"]'
      : 'after:content-[""]'

  return (
    <div
      className={twMerge(
        'flex h-6 w-[3.25rem] items-center justify-center rounded-lg border border-success ',
        className
      )}
    >
      <label
        htmlFor={`switch-${switchId}}`}
        className={`
              relative
              h-full
              w-full

              before:absolute
              before:top-1/2
              before:flex
              before:h-6
              before:w-6
              before:-translate-y-1/2
              before:items-center
              before:justify-center
              before:rounded-lg
              before:border
            before:border-success
              before:text-xl
              before:font-bold
            before:text-stone-100
              before:transition
              before:duration-500

              after:absolute
              after:-right-16
              after:top-1/2
              after:w-[max-content] 
              after:-translate-y-1/2 
              after:translate-x-1/2
              ${labelContentClass}
              

              ${
                isChecked
                  ? 'before:left-auto before:right-0 before:border-r-0 before:bg-success before:content-["✓"]'
                  : 'before:left-0 before:right-auto before:border-l-0 before:bg-gray-200 before:content-[""]'
              }`}
      >
        <input
          id={`switch-${switchId}}`}
          type='checkbox'
          className='absolute -left-[10000px]'
          onChange={onChange}
        ></input>
      </label>
    </div>
  )
}

export default ButtonSwitch
