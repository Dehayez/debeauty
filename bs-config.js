module.exports = {
  server: {
    baseDir: "./",
    middleware: function (req, res, next) {
      const url = req.url.split('?')[0];
      const cleanUrlMap = {
        '/': '/index.html',
        '/diensten': '/diensten.html',
        '/over': '/over.html',
        '/contact': '/contact.html'
      };
      
      if (cleanUrlMap[url]) {
        req.url = cleanUrlMap[url] + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
      }
      
      next();
    }
  },
  files: ['styles/*.css', 'scripts/*.js', '*.html'],
  port: 3001
};

