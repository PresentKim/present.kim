'use client'

import ExternalLink from '@/components/ui/ExternalLink'
import {
  ownerName,
  ownerGithub,
  ownerEmail,
  ownerDiscord,
} from '@/config/metadata'
import {Github, Mail, MessageCircle, Rss} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-card text-muted py-8">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="text-muted">
            © {new Date().getFullYear()}. {ownerName.en} all rights reserved.
          </div>
          <div className="[&>a]:hover:text-primary-foreground flex space-x-6">
            <ExternalLink href={ownerGithub}>
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </ExternalLink>
            <ExternalLink href={ownerEmail}>
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </ExternalLink>
            <ExternalLink href={ownerDiscord}>
              <MessageCircle className="h-6 w-6" />
              <span className="sr-only">Discord</span>
            </ExternalLink>
            <ExternalLink href="/rss.xml">
              <Rss className="h-6 w-6" />
              <span className="sr-only">RSS Feed</span>
            </ExternalLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
