const path = require('path');
const fs = require('fs');
const http = require('http');
const url = require('url');

const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === '/' || pathName === '/overview') {
    res.end('From Overview');
  } else if (pathName === '/product') {
    res.end('From Product');
  } else if (pathName === '/api') {
      res.writeHead(200, { 'Content-type': 'appliication/json' });
      res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html'
    });
    res.end('Page not found');
  }
});

server.listen('8000', () => {
    console.log('Server is up and running on port 8000');
});
