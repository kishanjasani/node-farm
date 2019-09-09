const path = require('path');
const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  }
  return output;
}
const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);
const templateOverview =  fs.readFileSync(`${__dirname}/template/template-overview.html`, 'utf-8');
const templateCard =  fs.readFileSync(`${__dirname}/template/template-card.html`, 'utf-8');
const templateProduct =  fs.readFileSync(`${__dirname}/template/template-product.html`, 'utf-8');

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const cardsHtml = dataObject.map(data => replaceTemplate(templateCard, data)).join('');
    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    // Product page
  } else if (pathname === '/product') {
    const product = dataObject[query.id];
    const productHtml = replaceTemplate(templateProduct, product);
    console.log(productHtml);
    res.end('From Product');
  // API
  } else if (pathname === '/api') {
      res.writeHead(200, { 'Content-type': 'appliication/json' });
      res.end(data);
    // Not Found
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
