

const about = (req,res)=>{
    let val = req.cookies.token;
    // console.log(val);
    if(val){
    res.render("about",{
        about:"this is about page brother....."
    });}else{
        res.render("login",{
            error:"Login to access the about page"
        })
    }

};

module.exports = {about};