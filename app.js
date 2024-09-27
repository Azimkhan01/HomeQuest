// importing required packages and routes and middlewares.
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const hbs = require("hbs");
const colors = require("colors");
const cors = require("cors");

const cookieParser = require("cookie-parser");
//initializing port ,routers,staticpath and partailspath
const port = process.env.port || 8000;

const { router } = require("./Routers/SignupRoutes");

const partialsPath = path.join(__dirname, "views/Partials");

const app = express();
app.use("/public", express.static(path.join(__dirname, "public")));
const dotenv = require("dotenv");
dotenv.config();
// console.log(process.env.secret,process.env.email,process.env.emailpass)
app.use(cookieParser());

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded());

app.use("/", router);

app.set("view engine", "hbs");

hbs.registerPartials(partialsPath);

app.use(helmet());

app.listen(port, "127.0.0.1", () => {
  console.log(
    colors.bgRed(`Server is Running ar port : `) +
      colors.bgGreen.underline.bold(`127.0.0.1:${port}`)
  );
});
