import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['next-mdx-remote'],
  experimental: {
    mdxRs: true,
  },
}

export default nextConfig
