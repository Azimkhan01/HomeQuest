
const admin = (req,res)=>{
if(req.cookies.admin)
    res.render('admin')
else
res.redirect("/login")
}

module.exports={admin}

