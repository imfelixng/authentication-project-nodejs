const express = require('express');
const routeProfile = require('./routes/profile-routes');
const routeAuth = require('./routes/auth-routes');
const app = express();
const mongoese = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const passportFacebook = require('./config/passport-facebook-setup');
const passportGoogle = require('./config/passport-google-setup');
const passportLocal = require('./config/passport-local-setup');
const session = require('express-session');
const passport = require('passport');
//static
app.use(express.static('public'));

//views
app.set('views','./views');
app.set('view engine', "ejs");

//body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//session
app.use(session({
    secret: 'ngquangan',
    resave: false,
    saveUninitialized: true
}))
//passport
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/auth', routeAuth);
app.use('/profile', routeProfile);

//mongodb connect
mongoese.connect(keys.mongodb.mongourl, () => {
    console.log("Ket noi db thanh cong!");
});

app.get('/', (req, res) => {
    res.render('index', {data : req.user});
});

app.get('/login', (req, res) => {
    let status = req.query.status;
    let message = null;
    if(status){
        if(status === 'success'){
            message = 'Dang ky tai khoan thanh cong!'
        }else{
            message = 'Tai khoan email nay da duoc dang ky!';
        }
    }
    res.render('login', {user: null, message: message});
});

app.listen(3000,() => {
    console.log("Server dang chay o cong 3000");
});