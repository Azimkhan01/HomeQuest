const fs = require("fs");
const path = require("path");

const stream = (req, res) => {
    const videoPath = path.join(__dirname, `../public/Assets/ListingVideos/${req.params.id}`); // Path to your video file
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (start >= fileSize || end >= fileSize) {
            res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
            return;
        }

        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': end - start + 1,
            'Content-Type': 'video/mp4',
        });

        // Create a read stream and set the start and end
        const stream = fs.createReadStream(videoPath, { start, end });

        // Send data in 10 byte chunks
        let offset = start; // Initialize offset
        stream.on('data', (chunk) => {
            let remainingBytes = chunk.length;
            let bytesToSend;

            while (remainingBytes > 0) {
                bytesToSend = Math.min(remainingBytes, 10); // Send a maximum of 10 bytes
                res.write(chunk.slice(0, bytesToSend)); // Write 10 bytes to response
                chunk = chunk.slice(bytesToSend); // Update the chunk to remove sent bytes
                remainingBytes -= bytesToSend; // Decrease the remaining bytes
            }
        });

        stream.on('end', () => {
            res.end();
        });

        stream.on('error', (err) => {
            console.error('Stream error:', err);
            res.status(500).send('Internal Server Error');
        });
    } else {
        res.writeHead(200, {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        });

        // Create a read stream for the entire file
        const stream = fs.createReadStream(videoPath);

        // Send data in 10 byte chunks
        stream.on('data', (chunk) => {
            let remainingBytes = chunk.length;
            let bytesToSend;

            while (remainingBytes > 0) {
                bytesToSend = Math.min(remainingBytes, 1048576); // Send a maximum of 10 bytes
                res.write(chunk.slice(0, bytesToSend)); // Write 10 bytes to response
                chunk = chunk.slice(bytesToSend); // Update the chunk to remove sent bytes
                remainingBytes -= bytesToSend; // Decrease the remaining bytes
            }
        });

        stream.on('end', () => {
            res.end();
        });

        stream.on('error', (err) => {
            console.error('Stream error:', err);
            res.status(500).send('Internal Server Error');
        });
    }
};

module.exports = { stream };
