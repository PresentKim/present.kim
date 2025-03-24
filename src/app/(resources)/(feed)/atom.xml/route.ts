'use server'

import {getFeed} from '@/lib/feed'

export async function GET() {
  return new Response(getFeed().atom1(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
