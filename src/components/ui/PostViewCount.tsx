'use client'

import usePostViewUpdate from '@/hooks/usePostViewUpdate'
import usePostViews from '@/hooks/usePostViews'

export default function PostViewCount({slug}: {slug: string}) {
  usePostViewUpdate(slug)
  const {data} = usePostViews(slug)
  return <div className="text-muted-foreground text-sm">{data?.views || 0}</div>
}
