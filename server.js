const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const requestedFile = req.url.substring(1); // Remove leading slash

    // Check if the requested file exists in the 'public' directory
    const imagePath = path.join(__dirname, 'public', requestedFile);
    fs.readFile(imagePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
        } else {
            // Determine the appropriate content type based on file extension
            const contentType = getContentType(requestedFile);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Helper function to determine content type based on file extension
function getContentType(filename) {
    const ext = path.extname(filename);
    switch (ext) {
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        // Add more cases as needed for different file types
        default:
            return 'application/octet-stream'; // Default content type
    }
}
