'use client'

import Link from 'next/link'
import Logo from '@/components/icon/Logo'
import FloatingHeader from '@/components/ui/FloatingHeader'
import {siteName} from '@/config/metadata'

export default function Header() {
  return (
    <FloatingHeader
      data-slot="header"
      className="border-border/40 bg-background/80 w-full border-b backdrop-blur-lg">
      <nav className="mx-auto max-w-4xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="hover:text-primary-foreground flex items-center space-x-2 text-xl font-bold">
            <Logo className="size-8" />
            <span className="hidden sm:block">{siteName}</span>
          </Link>
          <div className="[&>a]:hover:text-primary-foreground space-x-8 font-semibold">
            <Link href="/">HOME</Link>
            <Link href="/posts">POSTS</Link>
            <Link href="/projects">PROJECTS</Link>
          </div>
        </div>
      </nav>
    </FloatingHeader>
  )
}
