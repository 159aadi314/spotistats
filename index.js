const express= require('express')
const mongoose= require('mongoose')
const app = express();
const passportSetup=require('./config/passport-setup')
const auth_routes=require('./Routes/auth-routes')
const Profile=require('./Routes/profile-routes')

const keys=require('./Config/keys')
const cookieSession= require('cookie-session')
const passport= require('passport')
app.set('view engine','ejs');
app.use(cookieSession({
    maxAge:60*60*1000*24,
    keys:[keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session())

// create home route
app.get('/',(req,res)=>{
    res.render('home',{user: req.user})
    console.log(req.user)
});



// initialize passport


// connect to mongodb
mongoose.connect(keys.mongodb.dbURI,()=>{
    console.log('connected to mongodb')
})

// setup routes
app.use('/auth',auth_routes);
app.use('/profile',Profile);
// console.log(auth_routes);
app.listen(3000,()=>{
    console.log("App now listening for requests on port 3000")
})