const proxyTarget = process && process.env ? process.env.PROXY_TARGET : null;

const PROXY_CONFIG = [
  {
    context: [
      '/o/**',
      '/account/**',
      '/api/v1/**',
      '/admin/**',
      '/static/**',
      '/media/**',
    ],
    target: proxyTarget || 'http://localhost:8080',
    secure: false,
  }
];

module.exports = PROXY_CONFIG;
