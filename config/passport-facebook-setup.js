const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user-model');
const keys = require('./keys');

//facebook

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

passport.use(new FacebookStrategy({

        clientID: keys.facebook.ClientID,
        clientSecret: keys.facebook.ClientSecret,
        callbackURL: '/auth/facebook/redirect',
        profileFields: ['email', 'displayName', 'picture.type(large)']
    },(accessToken, refreshToken, profile, done) => {
        User.findOne({ID: profile.id}).then(currentUser => {
            if(currentUser){
                done(null, currentUser);
            }else{
                new User({
                    name: profile._json.name,
                    password: "",
                    intro: "Toi login bang facebook",
                    ID: profile._json.id,
                    avatar: profile.photos[0].value,
                    email: profile._json.email   
                }).save().then(newUser => {
                    done(null, newUser);
                });
            }
        });
    }
));