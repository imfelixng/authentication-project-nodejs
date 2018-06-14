const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user-model');
const keys = require('./keys');
//google

//ma hoa id
passport.serializeUser((user, done) => {
    done(null, user.id);
});
//giai ma id 
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});


passport.use(new GoogleStrategy({
        clientID: keys.google.ClientID,
        clientSecret: keys.google.ClientSecret,
        callbackURL: "/auth/google/redirect"
    },(accessToken, refreshToken, profile, done) => {
        User.findOne({ID : profile.id}).then(currentUser => {
            if(currentUser){
                console.log(currentUser);
                done(null, currentUser);
            }else{
                new User({
                    name: profile._json.displayName,
                    password: "",
                    intro: "Toi login bang google",
                    ID: profile._json.id,
                    avatar: getUrlAvatar(profile._json.image.url),
                    email: profile.emails[0].value   
                }).save().then(newUser => {
                    console.log(newUser);
                    done(null, newUser);
                });
            }
        });
    }
));

getUrlAvatar = (url) => {
    let index = url.indexOf('?');
    let newUrl = url.substring(0,index);
    return newUrl;
}
