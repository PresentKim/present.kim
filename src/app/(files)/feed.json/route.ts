'use server'

import {getFeed} from '@/utils/feed'

export async function GET() {
  return new Response(getFeed().json1(), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}
