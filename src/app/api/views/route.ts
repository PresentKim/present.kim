import {NextResponse, NextRequest} from 'next/server'
import supabase from '@/lib/supabase/private'

export async function GET(request: NextRequest) {
  const pathname = decodeURIComponent(
    request.nextUrl.searchParams.get('pathname') ?? '',
  )

  const {data, error} = await supabase.rpc('get_views', {
    page_pathname: pathname,
  })

  if (error)
    new Response(`Webhook error: ${error}`, {
      status: 400,
    })

  return NextResponse.json({views: data})
}

export async function POST(request: NextRequest) {
  try {
    const {pathname} = await request.json()
    const ip = (request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(
      ',',
    )[0]

    if (ip === '127.0.0.1' || ip === '::1')
      return new Response('ip is 127.0.0.1 or ::1', {
        status: 400,
      })

    await supabase.rpc('new_visitor', {page_pathname: pathname, user_ip: ip})
  } catch (error) {
    return new Response(`Webhook error: ${error}`, {
      status: 400,
    })
  }

  return new Response('Success', {
    status: 200,
  })
}
