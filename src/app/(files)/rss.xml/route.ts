'use server'

import {getFeed} from '@/utils/feed'

export async function GET() {
  return new Response(getFeed().rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
