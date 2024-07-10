

const home = (req,res)=>{
    let val = req.cookies.token;
    // console.log(val);
    if(val){
    res.render("home",{
        home:"this is home page brother....."
    });}else{
        res.render("login",{
            error:"Login to access the home page"
        })
    }

};

module.exports = {home};