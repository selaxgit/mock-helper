module.exports = {
  '/api': {
    target: 'http://localhost:3000',
    secure: false,
    changeOrigin: true,
  },
  '/mock': {
    target: 'http://localhost:3000',
    secure: false,
    changeOrigin: true,
  },
};
