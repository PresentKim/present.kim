'use client'

import {useEffect, useState, useRef} from 'react'
import useHeight from '@/hooks/useHeight'
import {cn} from '@/utils'

export default function FloatingHeader({
  className,
  ...props
}: Omit<React.ComponentProps<'header'>, 'ref'>) {
  const headerRef = useRef<HTMLElement>(null)
  const height = useHeight(headerRef)
  const [isVisible, setIsVisible] = useState(true)
  const scrollYRef = useRef(0)

  useEffect(() => {
    scrollYRef.current = window.scrollY
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(
        window.scrollY < scrollYRef.current || window.scrollY < height,
      )
      scrollYRef.current = window.scrollY
    }

    window.addEventListener('scroll', handleScroll, {passive: true})
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [setIsVisible, height])

  return (
    <>
      <div style={{minHeight: height}} />
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 z-50 transition-all',
          isVisible ? 'translate-y-0' : '-translate-y-full',
          className,
        )}
        {...props}
      />
    </>
  )
}
