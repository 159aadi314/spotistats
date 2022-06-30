const passport =require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys=require('./keys');
const User=require('../models/user-model');

passport.serializeUser((User,done)=>{
   done(null,User.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
//         console.log(User.id)
        done(null,user)
    });

});

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.spotify.clientID,
      clientSecret: keys.spotify.clientSecret,
      callbackURL: '/auth/spotify/redirect'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
        // check if users already exists
        console.log(accessToken)
        User.findOne({SpotifyID:profile.id}).then((currentUser)=>{
            if(currentUser){
                console.log('user is:',currentUser)
                done(null,currentUser)
            }
            else{
                new User({
                            username: profile.displayName,
                            SpotifyID: profile.id
                        }).save().then((newUser)=>{
                            console.log('new user created: '+newUser);
                            done(null,newUser);
                        }).catch((err)=>{
                            console.log(err)
                        })
            }
        }).catch((err)=>{
            console.log(err);
        })

    }
//     ()=>{}
  )
);