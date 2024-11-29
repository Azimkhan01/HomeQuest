const { agent } = require("../Database/registerUsers.js"); // Assuming `agent` schema exists
const { mail } = require("../Controllers/mailTo.js");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const bcrypt = require("bcrypt"); // Import bcrypt
const { Agent } = require("http");

// Function to handle admin actions such as adding a new agent
const handleAdmin = async (req, res) => {
  // Check if admin is logged in (based on cookies)
  if (req.cookies.admin) {
    const { username, email, phone, bio, adhaarcard, license, password,instagram,whatsapp,youtube } =
      req.body;
  let checkEmail = await agent.findOne({email:email})
  if(checkEmail)
  {
    res.status(400).render("admin",{
      status:"the agent already exist"
    })
  }
    // Check if a photo was uploaded
    if (!req.file) {
      return res.status(400).send("User photo is required");
    }

    // Check if the email is already registered
    const existingAgent = await agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).render("admin", {
        status: "Agent Already Exist",
      });
    }

    const photoUrl = `/public/Assets/AgentPhotos/${req.file.filename}`;

    try {
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

      // Create a new agent document with the uploaded photo and hashed password
      const newAgent = await agent.create({
        instagram,
        whatsapp,
        youtube,
        username,
        email,
        phone,
        bio,
        adhaarcard,
        license,
        image: photoUrl,
        password: hashedPassword,
        role: "agent",
        imgStatus: true, // Save the hashed password
      });

      // console.log(newAgent);

      // Send a confirmation email to the new agent
      await mail(email, username);

      // If successful, redirect to the admin panel or send a success response
      res.redirect("/admin"); // Adjust this to your admin panel route
    } catch (error) {
      console.error("Error adding agent:", error);
      res.status(500).render("admin", {
        status: "some error occur please again in sometime",
      });
    }
  } else {
    res.status(401).redirect("/login"); // If no admin cookie, respond with unauthorized
  }
};

// Multer storage configuration for agent photos
const agentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let directory;

    if (file.fieldname === "photo") {
      directory = path.join(__dirname, "../public/Assets/AgentPhotos");
    } else {
      return cb(new Error("Invalid file field name"));
    }

    // Ensure the directory exists
    fs.mkdirSync(directory, { recursive: true });

    cb(null, directory); // Set the destination folder
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now(); // Get the current timestamp
    const fileExtension = path.extname(file.originalname); // Get file extension

    let filename;
    if (file.fieldname === "photo") {
      filename = `photo-${timestamp}${fileExtension}`; // Construct filename
    } else {
      return cb(new Error("Invalid file field name"));
    }

    cb(null, filename); // Final filename for the uploaded photo
  },
});

module.exports = { agentStorage, handleAdmin };
