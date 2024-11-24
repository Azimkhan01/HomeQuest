const express = require("express");
const path = require("path");
const colors = require("colors");
const hbs = require("hbs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Import routes
const { router } = require("./Routers/SignupRoutes");

// Paths for static files and partials
const partialsPath = path.join(__dirname, "views/Partials");

// Middlewares
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting up view engine and partials
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Using routes
app.use("/", router);

// Start server
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(
    colors.bgBlue(`Worker ${process.pid} listening at http://127.0.0.1:${port}`)
  );
});

const port1 = process.env.PORT1 || 6000;
app.listen(port1, () => {
  console.log(
    colors.bgBlue(`Worker ${process.pid} listening at http://127.0.0.1:${port1}`)
  );
});

module.exports = app;
