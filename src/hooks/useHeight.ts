'use client'

import {useState, useEffect} from 'react'

/**
 * Returns the height of the target element. And updates the height when the element resizes using ResizeObserver.
 * @param targetRef - The ref of the target element.
 */
export default function useHeight(
  targetRef: React.RefObject<HTMLElement | null>,
  defaultHeight = 0,
) {
  const [height, setHeight] = useState(defaultHeight)

  useEffect(() => {
    if (!targetRef.current) {
      return
    }

    const observer = new ResizeObserver(([entry]) =>
      setHeight(entry.contentRect.height),
    )
    observer.observe(targetRef.current)
    return () => {
      observer.disconnect()
    }
  }, [targetRef])

  return height
}
