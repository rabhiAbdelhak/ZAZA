module.exports = {
  reactStrictMode: true,
  typescript: {
    //  this ignore temporary until Basic component converted to typescript
    ignoreBuildErrors: true,
  },
  images: {
    protocole: 'https',
    domains: [
      'api-manager.zimou.dev',
      'encrypted-tbn0.gstatic.com',
      'erp.zimou.dev',
      'startup.dz',
      'www.delivery.com',
      'via.placeholder.com',
      'st3.depositphotos.com',
      'via.placeholder.com',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/orders',
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: '/dashboard/orders',
        permanent: true,
      },
     
    
    ]
  },
}
