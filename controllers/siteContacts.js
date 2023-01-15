var express = require('express');
var router = express.Router();
const Cookies = require('cookies')
const Sequelize = require('sequelize');
const db = require('../models');
const keys = ['keyboard cat']

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.getLoginPage = (req, res, next) => {
    const cookies = new Cookies(req, res, {keys: keys})
    const success = cookies.get('success')

    if (success) {
        console.log("in success")
        res.render('login', {success: success});
    } else
        res.render('login', {success: ""});
};
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.getRegisterPage = (req, res, next) => {
    const cookies = new Cookies(req, res, {keys: keys})

    const error = cookies.get('expired')
    let userData = cookies.get('data', {signed: true});

    if (error) {
        res.render('register', {error: error});
    } else if (userData) {
        let allData = JSON.parse(userData);
        res.render('register', {
            firstName: allData.firstName,
            lastName: allData.lastName,
            email: allData.email,
            error: ""
        });

    } else {
        res.render('register', {error: ""});
    }
};
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.postLogin = (req, res, next) => {
    res.render('register', {title: 'Express'});
}
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.getPasswordPage = (req, res, next) => {
    const cookies = new Cookies(req, res, {keys: keys})

    let userData = cookies.get('data', {signed: true});
    if (userData)
        res.render('password');
    else
        res.redirect('register');
}
/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.postPassword = (req, res, next) => {

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
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.postNasa = (req, res, next) => {
    const cookies = new Cookies(req, res, {keys: keys})
    const {password, confirmPassword} = req.body;

    let userData = cookies.get('data', {signed: true});
    if (userData) {
        let allData = JSON.parse(userData);
        db.Contact.create({
            firstName: allData.firstName,
            lastName: allData.lastName,
            email: allData.email,
            password: password
        }).then();

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

}
