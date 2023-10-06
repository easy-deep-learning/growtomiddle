/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
      serverComponentsExternalPackages: ['mongoose'],
    },
    webpack (config) {
      config.experiments = { ...config.experiments, topLevelAwait: true }
      return config
    },
  }
  