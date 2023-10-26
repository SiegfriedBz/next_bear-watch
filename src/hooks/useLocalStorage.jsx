import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(null)

  useEffect(() => {
    setValue(() => {
      const jsonValue = localStorage.getItem(key)
      if (jsonValue == null) {
        if (typeof initialValue === 'function') {
          return initialValue()
        } else {
          return initialValue
        }
      } else {
        return JSON.parse(jsonValue)
      }
    })
  }, [key, initialValue])

  useEffect(() => {
    if (value === null) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue]
}
