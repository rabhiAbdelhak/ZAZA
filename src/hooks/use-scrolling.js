import { useCallback, useEffect, useRef, useState } from 'react'
import { throttle } from '../utils/throttle'

const useScrolling = () => {
  const [scrolling, setScrolling] = useState(false)
  const savedHandler = useRef()

  const changeScroll = useCallback(() => {
    if (window.scrollY > 10) {
      setScrolling(true)
    } else {
      setScrolling(false)
    }
  }, [])

  useEffect(() => {
    savedHandler.current = changeScroll
  }, [changeScroll])

  useEffect(() => {
    //Create event listener that calls handler function stored in ref
    const eventListener = (event) => savedHandler.current(event)
    const event = throttle(eventListener)
    window.addEventListener('scroll', event)
    return () => window.removeEventListener('scroll', event)
  }, [])

  return { scrolling }
}

export default useScrolling
