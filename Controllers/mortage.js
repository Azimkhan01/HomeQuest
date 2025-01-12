const mortage = (req,res)=>{
    if(req.cookies.token)
        res.render('mortage')
    else
    res.redirect('/login')
}

module.exports = {mortage}