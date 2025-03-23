'use client'

import type {ComponentProps} from 'react'
import Link from 'next/link'

type ExternalLinkProps = Omit<ComponentProps<typeof Link>, 'target' | 'rel'>

export default function ExternalLink({children, ...props}: ExternalLinkProps) {
  return (
    <Link target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </Link>
  )
}
