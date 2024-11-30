const express = require("express");
const path = require("path");
const colors = require("colors");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// Initialize environment variables
dotenv.config();

// Create Express app and HTTP server
const app = express();

// Import routes
const { router } = require("./Routers/SignupRoutes");

// Paths for static files and partials
const partialsPath = path.join(__dirname, "views/Partials");

// Middleware setup
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting up view engine and partials
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);
// Use routes
app.use("/", router);

// Start server
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(
    colors.bgBlue(`Worker ${process.pid} listening at http://127.0.0.1:${port}`)
  );
});

module.exports = app;
