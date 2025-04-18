'use client'

import {Github, Mail, MessageCircle, Rss} from 'lucide-react'
import ExternalLink from '@/components/ui/ExternalLink'
import {ownerName, ownerGithub, ownerEmail, ownerDiscord} from '@/lib/metadata'

export default function Footer() {
  return (
    <footer className="bg-card/50 text-muted-foreground w-full py-4 md:py-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between space-y-4 px-4 md:flex-row md:space-y-0">
        <div>
          © {new Date().getFullYear()}. {ownerName.en} all rights reserved.
        </div>
        <div className="flex space-x-6">
          <ExternalLink href={ownerGithub} className="hover-underline">
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </ExternalLink>
          <ExternalLink
            href={`mailto:${ownerEmail}`}
            className="hover-underline">
            <Mail className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </ExternalLink>
          <ExternalLink href={ownerDiscord} className="hover-underline">
            <MessageCircle className="h-6 w-6" />
            <span className="sr-only">Discord</span>
          </ExternalLink>
          <ExternalLink href="/atom.xml" className="hover-underline">
            <Rss className="h-6 w-6" />
            <span className="sr-only">RSS Feed</span>
          </ExternalLink>
        </div>
      </div>
    </footer>
  )
}
