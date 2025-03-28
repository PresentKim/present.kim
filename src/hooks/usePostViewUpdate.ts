'use client'

import {useEffect} from 'react'

export default function usePostViewUpdate(pathname: string) {
  useEffect(() => {
    fetch('/api/views', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pathname: pathname,
      }),
    })
  }, [pathname])
}
