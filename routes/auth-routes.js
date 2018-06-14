const router = require('express').Router();
const User = require('../models/user-model');
const passport = require('passport');

router.get('/google',passport.authenticate('google', {
    scope : ['profile','email']
}));

router.get('/google/redirect', passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/profile'
}));


router.get('/facebook', passport.authenticate('facebook', { scope: ['email','public_profile']}));

router.get('/facebook/redirect', passport.authenticate('facebook', {
                                                                        successRedirect: '/profile',
                                                                        failureRedirect: '/login'
                                                                    }));
router.post('/login', passport.authenticate('local',
                                            {
                                                successRedirect: '/profile',
                                                failureRedirect: '/login'
                                            }));


router.post('/register', (req, res) => {
    
    User.findOne({email : req.body.email}).then(currentUser => {
        if(currentUser){
            res.redirect('/login?status=error');
        }else{
            new User({
                name: req.body.hoten,
                password: req.body.password,
                intro: req.body.gioithieu,
                ID: getID(30),
                avatar: "./images/image-profile.jpg",
                email: req.body.email
            }).save().then(newUser => {
                console.log(newUser);
                res.redirect('/login?status=success');
            });
        }
    });
});

router.get('/logout',(req, res) => {
    req.logout();
    res.redirect('/');
});

const getID = (lengthID)=> {
    let ID = "";

    let arr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Y","W","Z",
               "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","x","y","z",
               "0","1","2","3","4","5","6","7","8","9"
              ];
    for(let i = 0; i < lengthID ;i++){
        let randomIndex = Math.floor(Math.random()* arr.length);
        ID+= arr[randomIndex];
    }
    return ID;
}

module.exports = router;