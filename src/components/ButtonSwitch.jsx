import { useId } from 'react'

const ButtonSwitch = ({ isEditMode, setIsEditMode }) => {
  const switchId = useId()

  return (
    <div className='my-2 flex h-6 w-[3.25rem] items-center justify-center rounded-lg border border-slate-900 dark:border-stone-100'>
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
              before:border-slate-900/80 
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
              after:content-["Map_edit_mode"]
              
              dark:before:border-stone-100/80
              ${
                isEditMode
                  ? 'before:left-auto before:right-0 before:border-r-0 before:bg-success before:content-["✓"]'
                  : 'before:left-0 before:right-auto before:border-l-0 before:bg-stone-100 before:content-[""]'
              }`}
      >
        <input
          id={`switch-${switchId}}`}
          type='checkbox'
          className='absolute -left-[10000px]'
          onChange={() => setIsEditMode((prev) => !prev)}
        ></input>
      </label>
    </div>
  )
}

export default ButtonSwitch
