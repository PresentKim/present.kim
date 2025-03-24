# [present.kim](https://present.kim)

[![Vercel](https://vercelbadge.vercel.app/api/PresentKim/present.kim)](https://present.kim)

**present.kim**은 포트폴리오 스타일의 랜딩 페이지와 블로그, 프로젝트를 소개하는 개인 웹사이트입니다.
Next.js와 TypeScript로 개발되었으며, TailwindCSS v4를 활용해 깔끔하고 반응형 UI를 구현합니다.
Vercel을 통해 배포되며, MDX로 작성된 콘텐츠를 동적으로 렌더링합니다.
코드 하이라이팅, SEO 최적화, 피드 생성 등 다양한 기능을 제공합니다.

- **웹사이트**: [present.kim](https://present.kim)

## 주요 기능

- **랜딩 페이지**: 포트폴리오 스타일로 블로그 포스트와 프로젝트를 한눈에 나열.
- **블로그**: `/posts/[...slug]`로 동적 라우팅된 MDX 기반 포스트, `remark-gfm`으로 GitHub Flavored Markdown 지원.
- **프로젝트**: `/projects/[...slug]`로 동적 라우팅된 MDX 기반 프로젝트 설명.
- **코드 하이라이팅**: `rehype-pretty-code`로 코드 블록 렌더링.
- **피드**: `feed` 패키지로 `rss.xml`, `atom.xml`, `feed.json` 생성 및 제공.
- **SEO**: `next-seo`와 `next-sitemap`으로 검색 엔진 최적화, `robots.txt` 및 자동 링크 헤딩(`rehype-autolink-headings`) 지원.
- **성능 분석**: Vercel의 `@vercel/analytics`와 `@vercel/speed-insights`로 웹사이트 성능 모니터링.

## 기술 스택

### 핵심 기술

- **프레임워크**: [Next.js 15](https://nextjs.org/) (App Router 기반)
- **언어**: [TypeScript 5](https://www.typescriptlang.org/)
- **스타일링**: [TailwindCSS 4](https://tailwindcss.com/)
- **콘텐츠**: [MDX](https://mdxjs.com/) (`next-mdx-remote`로 동적 렌더링)
- **배포**: [Vercel](https://vercel.com/) (Analytics 및 Speed Insights 포함)
- **상태 관리**: [Zustand 5](https://zustand-demo.pmnd.rs/) (경량화된 상태 관리)

### 의존성

- **날짜 처리**: `dayjs` (가벼운 날짜 유틸리티)
- **아이콘**: `lucide-react` (현대적인 SVG 아이콘 라이브러리)
- **컴포넌트**: `shadcn/ui` (TailwindCSS 기반의 재사용 가능하고 접근성 높은 UI 컴포넌트 라이브러리)
- **파일 처리**: `glob` (파일 시스템 탐색)
- **클래스 유틸리티**: `clsx` (조건부 클래스 병합)

### 개발 도구

- **린팅**: [ESLint 9](https://eslint.org/)
- **포매팅**: [Prettier](https://prettier.io/)

## 폴더 구조

```
./
├── content/                   # MDX 콘텐츠
│   ├── posts/                 # 블로그 포스트 MDX
│   │   └── [...slug].mdx
│   └── projects/              # 프로젝트 MDX
│       └── [...slug].mdx
├── public/                    # 정적 리소스
│   ├── assets/                # 추가 정적 파일
│   │   ├── posts/             # 블로그 포스트 리소스
│   │   │   └── [...slug]/
│   │   │       └── [name].png
│   │   ├── projects/          # 프로젝트 리소스
│   │   │   └── [...slug]/
│   │   │       └── [name].png
│   │   └── [name].png
│   └── thumbnail.png          # 웹사이트 섬네일
├── src/
│   ├── app/                   # App Router 라우팅
│   │   ├── (resources)/
│   │   │   ├── (feed)/        # 피드 리소스
│   │   │   │   ├── atom.xml/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── feed.json/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── rss.xml/
│   │   │   │   │   └── route.ts
│   │   │   │   └── sitemap.ts
│   │   │   └── globals.css    # TailwindCSS 전역 스타일
│   │   ├── posts/             # 블로그 포스트
│   │   │   ├── [...slug]/
│   │   │   │   └── page.tsx   # 개별 포스트
│   │   │   └── page.tsx       # 포스트 목록 (옵션)
│   │   ├── projects/          # 프로젝트
│   │   │   ├── [...slug]/
│   │   │   │   └── page.tsx   # 개별 프로젝트
│   │   │   └── page.tsx       # 프로젝트 목록 (옵션)
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── page.tsx           # 메인 랜딩 페이지
│   │   ├── favicon.ico
│   │   ├── icon.png
│   │   ├── icon.svg
│   │   └── robots.txt
│   ├── components/
│   │   ├── icons/             # 아이콘 컴포넌트
│   │   │   └── [name].tsx
│   │   ├── layouts/           # 레이아웃 컴포넌트
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   ├── ui/                # UI 컴포넌트
│   │   │   └── [name].tsx
│   ├── hooks/                 # 커스텀 훅
│   │   └── [name].ts
│   ├── lib/                   # 유틸리티 및 설정
│   │   ├── metadata.ts        # 메타데이터 설정
│   │   └── [name].ts
├── .gitignore                 # Gitignore 설정
├── .prettierrc                # Prettier 설정
├── components.json            # shadcn/ui 설정
├── eslint.config.mjs          # ESLint 설정
├── next.config.ts             # Next.js 설정
├── package.json               # npm 설정
├── postcss.config.mjs         # PostCSS 설정
├── README.md                  # 프로젝트 설명
└── tsconfig.json              # TypeScript 설정
```
