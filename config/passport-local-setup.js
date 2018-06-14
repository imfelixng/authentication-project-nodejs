const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user-model');

//ma hoa email
passport.serializeUser((user, done) => {
    done(null, user.email);
});

//giai ma email
passport.deserializeUser((email, done) => {
    User.findOne({email : email}).then(user => {
        done(null, user);
    });
});

//local
passport.use( new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },(username, password, done) => {
        User.findOne({email : username}).then(currentUser => {
            if(!currentUser){
                return done(null, false);
            }

            if(currentUser.password !== password){
                return done(null, false);
            }
            return done(null, currentUser);
        });
    }
));
