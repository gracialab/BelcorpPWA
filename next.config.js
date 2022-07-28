/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  future: { webpack5: true }
}

module.exports = withPWA({
  pwa: {
    dest: 'public'
  }
})

module.exports = nextConfig
