const PROXY_CONFIG = [
  {
    context: [
      '/o/**',
      '/account/**',
      '/api/v1/**'
    ],
    target: 'http://localhost:8080',
    secure: false,
  }
];

module.exports = PROXY_CONFIG;
