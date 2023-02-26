import { useState, useEffect, useCallback } from 'react'

interface windowDimensions {
  width: number | null
  height: number | null
}

const useWindowDimensions = (): windowDimensions => {
  const hasWindow = typeof window !== 'undefined'

  const getWindowDimensions = useCallback((): windowDimensions => {
    const width = hasWindow ? window.innerWidth : null
    const height = hasWindow ? window.innerHeight : null
    return {
      width,
      height
    }
  }, [hasWindow])

  const [windowDimensions, setWindowDimensions] = useState<windowDimensions>(getWindowDimensions())

  useEffect(() => {
    const handleResize = (): void => {
      setWindowDimensions(getWindowDimensions())
    }
    if (hasWindow) {
      handleResize()

      window.addEventListener('resize', () => handleResize())
      return () => window.removeEventListener('resize', () => handleResize())
    }
  }, [hasWindow, getWindowDimensions])

  return windowDimensions
}

export default useWindowDimensions
