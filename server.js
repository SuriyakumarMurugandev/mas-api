// const fs = require('fs');
// const http = require('http');
// const https = require('https');

// const app = require('./app');

// const PORT = process.env.PORT || 3000;

// // ✅ SSL options
// const sslOptions = {
//   key: fs.readFileSync('./ssl/key.pem'),
//   cert: fs.readFileSync('./ssl/cert.pem')
// };

// // ✅ HTTPS server
// https.createServer(sslOptions, app).listen(443, () => {
//   console.log('✅ HTTPS Server running on port 443');
// });

// // ✅ Optional: HTTP → HTTPS redirect
// http.createServer((req, res) => {
//   res.writeHead(301, {
//     Location: 'https://' + req.headers.host + req.url
//   });
//   res.end();
// }).listen(80, () => {
//   console.log('🔁 HTTP redirect to HTTPS on port 80');
// });


const fs = require('fs');
const http = require('http');
const https = require('https');
const app = require('./app');

if (process.env.NODE_ENV === 'production') {
    const sslOptions = {
        key: fs.readFileSync('./ssl/key.pem'),
        cert: fs.readFileSync('./ssl/cert.pem')
    };

    https.createServer(sslOptions, app).listen(443, () => {
        console.log('HTTPS Server running on port 443');
    });
} else {
    http.createServer(app).listen(3000, () => {
        console.log('HTTP Server running on port 3000');
    });
}