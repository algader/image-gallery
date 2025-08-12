const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({message: 'الخادم يعمل!'}));
});

server.listen(5001, () => {
  console.log('🚀 الخادم يعمل على المنفذ 5001');
});
