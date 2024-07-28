const bcrypt = require("bcrypt");
const colors = require("colors");
var jwt = require('jsonwebtoken');
const {mail} = require("./mailToLogin");
const {user} = require("../Database/registerUsers");
const loginUser = async (req,res)=>
{
    const result = await user.findOne({email: await req.body.email});
    // console.log(await req.body.email, await req.body.password);
    if( await req.body.email == "" || await req.body.password == "" || await req.body.email == undefined || await req.body.password == undefined || await req.body.email == null || await req.body.password == null)
    {
          res.render("login",
                      {
                        error:"Email and Password is Required"
                      }
                    )
    }
    else if(result)
    {
        let myPlaintextPassword = await req.body.password;
        let hash = await result.password;
    //  console.log(result.password);
     bcrypt.compare(myPlaintextPassword, hash).then(async function(r) {
        if(r){
            // let privateKey = process.env.privateKey;
                 let token = jwt.sign({
                   data:await result
                  }, '249658', { expiresIn: '1d' });
              //   console.log(token);
              res.cookie("token",token);
             res.redirect("home");
             if(! await req.cookies.token){
             await  mail(result.email,result.username);
             }
             else{
                return
             }
    
            }
        else{
            res.render("login",{
                error:"Password entered is wrong "
            })
        }
        
    });
     
    }
    else
    {
        // console.log(result);
    res.render("login",{
        error:"Brutal error try again in some time"
    });
    console.log(colors.red("brutal error in login page last line:45  else "))
    }
};

module.exports = {loginUser};