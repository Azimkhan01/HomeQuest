// importing required packages and routes and middlewares.
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const colors = require('colors');

//initializing port ,routers,staticpath and partailspath
const port = process.env.PORT || 3000;
const {router} = require("./Routers/SignupRoutes");
const staticPath = path.join(__dirname,"./views");
const partialsPath = path.join(__dirname,"./views/Partials");

const app = express();

app.use(express.static(staticPath))
app.use(express.json());
app.use(express.urlencoded());
app.use("/signup",router);
app.set('view engine','hbs');

hbs.registerPartials(partialsPath)

app.listen(port,"127.0.0.1",()=>{
    console.log(
       colors.bgRed( `Server is Running ar port : `)+
        colors.bgGreen.underline.bold( `127.0.0.1:${port}`)
    );
})
