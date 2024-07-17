// importing required packages and routes and middlewares.
const bodyParser = require("body-parser")
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const colors = require('colors');
// const helmet = require('helmet');
const cookieParser = require('cookie-parser')
//initializing port ,routers,staticpath and partailspath
const port = process.env.port || 5000;

const {router} = require("./Routers/SignupRoutes");



const partialsPath = path.join(__dirname,'views/Partials');

const app = express();
app.use('/public',express.static(path.join(__dirname,'public')));
const dotenv = require("dotenv")
dotenv.config();
// console.log(process.env.secret,process.env.email,process.env.emailpass)
app.use(cookieParser())

app.use(express.json());

app.use(bodyParser.urlencoded());

app.use("/",router);




app.set('view engine','hbs');

hbs.registerPartials(partialsPath);


app.listen(port,"127.0.0.1",()=>{
    console.log(
       colors.bgRed( `Server is Running ar port : `)+
        colors.bgGreen.underline.bold( `127.0.0.1:${port}`)
    );
})
