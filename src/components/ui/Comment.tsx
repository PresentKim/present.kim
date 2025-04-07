'use client'

import Giscus from '@giscus/react'

export default function Comment() {
  return (
    <Giscus
      id="comments"
      repo="PresentKim/present.kim"
      repoId="R_kgDOONTIaQ"
      category="Announcements"
      categoryId="DIC_kwDOONTIac4Co36o"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="ko"
    />
  )
}
