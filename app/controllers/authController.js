var isLoggedIn = require('../middlewares/isLoggedIn');

module.exports = function (app, passport) {


    // HOME PAGE
    app.get('/', function (req, res) {
        res.render('home.ejs');
    });

    // LOGIN
    app.get('/login', function (req, res) {
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/todos',
        failureRedirect: '/login',
        failureFlash: true
    }));


    // SIGNUP
    app.get('/signup', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/todos',
        failureRedirect: '/signup',
        failureFlash: true
    }));


    // PROFILE SECTION
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
    });

    // LOGOUT
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

