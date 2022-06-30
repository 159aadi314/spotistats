const router=require('express').Router();

const authCheck= (req,res,next)=>{
    if(!req.user )
    {
        //if user is not logged in
        res.redirect('/auth/login');
    }
    else{
        next();
    }
}
router.get('/',authCheck,(req,res)=>{
    console.log(req.user)
    res.render('profile',{username:req.user.username})
});

module.exports=router
