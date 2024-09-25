const mongoose = require("mongoose");
const colors = require("colors");
const bcrypt = require('bcrypt');
const {mail} = require("./mailTo");
const {user} = require("../Database/registerUsers");

const signupUser = async (req,res)=>
{   let result =  await user.findOne({"email":await req.body.email})
    
    if(await req.body.username == "" || await req.body.password == "" || await req.body.username == undefined || await req.body.password == undefined)
    {

        res.render("signup",
        {
            error:"Password or Username is required"
        })

    }
    else if(await req.body.email == "" || result !=null)
    {
        
        
       if(await req.body.email == "")
       {
        console.log(colors.bgYellow("email entered is required /'null/' entered return to signup page"))
            res.render("signup",
                {
                  error:"Email is required"
                })
       }else if( await req.body.email == result !=null )
       {
        console.log(colors.bgYellow("email entered is already exist return to signup page"))
        res.render("signup",
            {
             error:"Email already exist"
            })   
       }else{
        console.log(colors.red("some brutal email error please see "));
        res.render("signup",{
            error:"Email error login after sometime"
        })
       }
    }
    else
    {   console.log(colors.red(await result,">>is the result"));
        const myPlaintextPassword = await req.body.password;
        const someOtherPlaintextPassword = await req.body.password;
        const saltRounds = 10;
                   
        bcrypt.hash(myPlaintextPassword, saltRounds,async function(err, hash)
        {
            let password = await hash;
            console.log(req.body.username," ",req.body.email," ",password);
            let creating = await user.create(
                  {
                     "username": await req.body.username,
                    "email": await req.body.email,
                    "password": await password,
                   }).
                        then( (data)=>
                              {      
                                     console.log(colors.green("The data is added: "+colors.cyan(data)));
                                      res.render("login");
                                      mail( req.body.email, req.body.username);
                               });
       
        });
   
    
    };
}
module.exports = {signupUser};