module.exports = {
  server: {
    baseDir: "./",
    middleware: function (req, res, next) {
      const cleanUrlMap = {
        '/diensten': '/diensten.html',
        '/over': '/over.html',
        '/contact': '/contact.html'
      };
      
      if (cleanUrlMap[req.url]) {
        req.url = cleanUrlMap[req.url];
      }
      
      next();
    }
  },
  files: ['styles/*.css', 'scripts/*.js', '*.html'],
  port: 3001
};

