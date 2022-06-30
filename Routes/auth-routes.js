const router=require('express').Router();
const passport= require('passport')
// auth login
router.get('/login',(req,res)=>{
    res.render('login');
})

router.get('/spotify',passport.authenticate('spotify',{
    scope:[
        'user-read-email',
        'streaming',
        'user-read-private',
        'user-library-read',
        'user-library-modify',
        'user-read-playback-state',
        'user-modify-playback-state',
    ]
}))

router.get('/logout',(req,res)=>{
    //handle with passport
    req.logout();
    delete req.session
    res.redirect('/');
})

//callback for spotify
router.get('/spotify/redirect',passport.authenticate('spotify'),
     function(req, res) {
       // Successful authentication, redirect home.
//        res.send(req.user);
        res.redirect('/profile')
     })


module.exports = router;