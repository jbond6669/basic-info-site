const http = require('http');
const fs = require('fs');
const path = require('path');

// Helper function to serve a file
function serveFile(res, filePath, contentType, responseCode = 200) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

// Create the HTTP server
const server = http.createServer((req, res) => {
    const url = req.url.toLowerCase();
    switch (url) {
        case '/':
            serveFile(res, path.join(__dirname, 'public', 'index.html'), 'text/html');
            break;
        case '/about':
            serveFile(res, path.join(__dirname, 'public', 'about.html'), 'text/html');
            break;
        case '/contact':
            serveFile(res, path.join(__dirname, 'public', 'contact.html'), 'text/html');
            break;
        default:
            serveFile(res, path.join(__dirname, 'public', '404.html'), 'text/html', 404);
            break;
    }
});

// Define the port to listen on
const port = process.env.PORT || 3000;

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
