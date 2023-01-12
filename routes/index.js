var express = require('express');
var router = express.Router();
const Cookies = require('cookies')
const Sequelize = require('sequelize');
const db = require('../models');
const keys = ['keyboard cat']


router.get('/', function (req, res, next) {
    res.render('login', {success: ""});
});
router.get('/login', function (req, res, next) {
    const cookies = new Cookies(req, res, {keys: keys})
    const success = cookies.get('success')

    if (success) {
        console.log("in success")
        res.render('login', {success: success});
    } else
        res.render('login', {success: ""});
});


router.get('/register', function (req, res, next) {
    const cookies = new Cookies(req, res, {keys: keys})

    const error = cookies.get('expired')
    let userData = cookies.get('data', {signed: true});

    if (error) {
        res.render('register', {firstName: '', lastName: '', email: '', error: error});
    } else if (userData) {
        let allData = JSON.parse(userData);
        res.render('register', {
            firstName: allData.firstName,
            lastName: allData.lastName,
            email: allData.email,
            error: ""
        });

    } else {
        res.render('register', {firstName: "", lastName: "", email: "", error: ""});
    }

    //res.redirect('register');
});


router.post('/login', function (req, res, next) {

    res.render('register', {title: 'Express'});

});

router.get('/password', function (req, res, next) {
    const cookies = new Cookies(req, res, {keys: keys})

    let userData = cookies.get('data', {signed: true});
    if (userData)
        res.render('password');
    else
        res.redirect('register');
});

router.post('/password', function (req, res, next) {
    const {firstName, lastName, email} = req.body;
    const data = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email
    }

    const cookies = new Cookies(req, res, {keys: keys})

    let userData = cookies.get('data', {signed: true});
    if (userData) {
        let allData = JSON.parse(userData);
        res.redirect('password')
    } else {
        cookies.set('data', JSON.stringify(data), {signed: true, maxAge: 30 * 1000})
        res.redirect('password')
    }
});

router.post('/nasa', function (req, res, next) {
    const cookies = new Cookies(req, res, {keys: keys})
    const {password, confirmPassword} = req.body;

    let userData = cookies.get('data', {signed: true});
    if (userData) {
        let allData = JSON.parse(userData);
        let u = db.Contact.build({
            firstName: allData.firstName,
            lastName: allData.lastName,
            email: allData.email,
            password: password
        });
        // return u.save()
        //     .then((contact) => res.render('added', {message: "The contact was added successfully!"}))
        //     .catch((err) => {
        //         if (err instanceof Sequelize.ValidationError)
        //             console.log(`validation error ${err}`);
        //         // one possible error is that the phone is missing, check the model files for more details
        //         else
        //             console.log(`other error ${err}`);
        //
        //         res.render('added', {message: `input validation error: ${err}`});
        //     })
        cookies.set('success', 'You have successfully registered to the site', {signed: true, maxAge: 1000})
        res.redirect('/login');
    } else {
        cookies.set('expired', 'Registration process expired,please start again', {signed: true, maxAge: 1000})
        res.redirect('/register');
    }

});

module.exports = router;
