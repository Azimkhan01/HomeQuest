const fs = require("fs");
const path = require("path");

const stream = (req, res) => {
    const videoPath = path.join(__dirname, `../public/Assets/ListingVideos/${req.params.id}`);
    if (!fs.existsSync(videoPath)) {
        res.status(404).send("Video not found");
        return;
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? Math.min(parseInt(parts[1], 10), fileSize - 1) : fileSize - 1;

        if (isNaN(start) || isNaN(end) || start >= fileSize || end < start) {
            res.status(416).header("Content-Range", `bytes */${fileSize}`).send("Requested range not satisfiable");
            return;
        }

        const chunkSize = end - start + 1;
        res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": "video/mp4",
        });

        const stream = fs.createReadStream(videoPath, { start, end });
        stream.pipe(res).on("error", (err) => {
            console.error("Stream error:", err);
            res.status(500).send("Internal Server Error");
        });
    } else {
        res.writeHead(200, {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4",
        });

        const stream = fs.createReadStream(videoPath);
        stream.pipe(res).on("error", (err) => {
            console.error("Stream error:", err);
            res.status(500).send("Internal Server Error");
        });
    }
};

module.exports = { stream };
