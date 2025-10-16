// Simple script to check if the development server is running
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  if (res.statusCode === 200) {
    console.log('Development server is running properly!');
  } else {
    console.log('Development server may have issues');
  }
});

req.on('error', (error) => {
  console.log('Development server is not running or not accessible');
  console.log('Please start the server with: npm run dev');
});

req.end();