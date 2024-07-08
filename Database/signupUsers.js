const mongoose = require("mongoose");
const colors = require("colors");

mongoose.connect("mongodb://localhost:27017/HomeQuest").then(()=>{
    console.log(colors.bgBlue.blue("Database Connected Succesfully ::  url(mongodb://localhost:27017/) ::  Database: HomeQuest"));
}).catch((err)=>{
    console.log(colors.red("while connecting database error occurs:"+err));
});

