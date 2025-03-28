'use client'

import useSWR from 'swr'

export default function usePostViews(pathname: string) {
  const {data, error, isLoading} = useSWR(
    `/api/views?pathname=${encodeURIComponent(pathname)}`,
    url => fetch(url).then(r => r.json()),
  )

  return {data, error, isLoading}
}
