import { useState, useEffect } from 'react'

export const useDisplay = (): { isDisplayNone: boolean } => {
  const [isDisplayNone, setIsDisplayNone] = useState(false)
  useEffect(() => {
    const getWidth = window.innerWidth

    if (getWidth < 850) {
      setIsDisplayNone(true)
    } else {
      setIsDisplayNone(false)
    }
  }, [])
  return { isDisplayNone }
}
