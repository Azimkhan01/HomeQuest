const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const { feed , agent} = require('../Database/registerUsers');

const handleAddPages = async (req, res) => {
    if (req.cookies.agentToken) {
        try {
            const decoded = jwt.verify(req.cookies.agentToken, process.env.JWT_SECRET); // Replace 'your-secret-key' with your JWT secret key
console.log(decoded)
            const { link, description, hashtags, title } = req.body;
            let newhashTag = hashtags.trim().split('#');
            let images = [];
            req.files.images.forEach(element => {
                images.push(element.filename);
            });
            let result = await feed.create({owner: decoded.data._id,link, description, hashtags: newhashTag, title, images });
            let updateAgent =   await agent.updateOne({_id:decoded.data._id},{$push:{feed:result._id}})
            console.log(updateAgent)
            res.redirect("/agent/addPages");

        } catch (error) {
            console.error('JWT Verification Failed:', error);
            res.status(401).send('Unauthorized');
        }
    } else {
        // No token in the cookies, redirect to login page
        res.redirect("/login");
    }
}

const pageImageUpload = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../public/Assets/postImage'); // Directory for uploads
        cb(null, uploadPath); // Save files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
        // Generate a unique filename (e.g., timestamp + original name)
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

module.exports = { handleAddPages, pageImageUpload };
