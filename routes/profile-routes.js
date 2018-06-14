const router = require('express').Router();

const checkAuth = (req, res ,next) => {
    if(!req.user){
        res.redirect('/login');
    }else{
        next();
    }
}

router.get('/', checkAuth, (req, res) => {
    res.render('profile', {data : req.user});
});


module.exports = router;