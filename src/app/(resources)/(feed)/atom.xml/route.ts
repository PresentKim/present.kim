'use server'

import {getFeed} from '@/lib/feed'

export async function GET() {
  const feed = await getFeed()
  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
