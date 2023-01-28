var express = require('express');
var router = express.Router();
const Cookies = require('cookies')
const db = require('../models');
const keys = ['keyboard cat']
const Messages = ['Incorrect username or password, or you are not registered on the site. Please try again',
    'Can not login right now, please try again later', 'Can not register right now, please try again later',
    'This email already exist, please register with another one',
    "Password problem please try again",
    'Registration process expired,please start again',
"There is an error in one of the data, please try again"]
const PROBLEMWITHUSER = 0;
const PROBLEMWITHDATABASE = 1;
const REGISTERPROBLEMWITHDATABASE = 2;
const EMAILEXISTS = 3;
const PASSWORDPROBLEM = 4;
const EXPIRED = 5;
const DATAPROBLEM = 6;

/**
 * Clear the cache memory
 * @param req
 * @param res
 * @param next
 */
exports.preventCashing = (req, res, next) => {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.set('Pragma', 'no-cache');
    next();
}

/**
 * Prevent web redirect to other pages, while session is login
 * @param req
 * @param res
 * @param next
 */
exports.redirect = (req, res, next) => {
    if (req.session.login && req.url !== "/nasa")
        res.redirect('nasa')
    next()
}

/**
 * To get login page with the details of the user
 * @param req
 * @param res
 */
exports.getLoginPage = (req, res) => {
    const cookies = new Cookies(req, res, {keys: keys})
    const success = cookies.get('success')
    const error = cookies.get('errorLogin')

    if (success)
        res.render('login', {success: success, error: ""});
    else if (error)
        res.render('login', {success: "", error: error});
    else
        res.render('login', {success: "", error: ""});
};

/**
 * To post login page and check if the user exist in the database
 * @param req
 * @param res
 */
exports.postLogin = async (req, res) => {
    const cookies = new Cookies(req, res, {keys: keys})
    const {email, password} = req.body;
    return db.Contact.findOne({where: {email: email.toLowerCase(), password: password}})
        .then((user) => {
            if (user) {
                req.session.login = true;
                req.session.firstName = user.firstName;
                req.session.user_id = user.id;
                req.session.lastName = user.lastName;
                res.redirect('nasa');
            } else {
                cookies.set('errorLogin', `${Messages[PROBLEMWITHUSER]}`, {signed: true, maxAge: 1000})
                res.redirect('login');
            }
        })
        .catch((error) => {
            cookies.set('errorLogin', `${Messages[PROBLEMWITHDATABASE]}`, {signed: true, maxAge: 1000})
            res.redirect('login');
        });
}

/**
 * To get Register page and to get the details of the user: first name, last name and email
 * @param req
 * @param res
 */
exports.getRegisterPage = (req, res) => {
    const cookies = new Cookies(req, res, {keys: keys});
    const error = cookies.get('expired')
    const registerError = cookies.get('registerError')
    let userData = cookies.get('data', {signed: true});

    if (error) {
        res.render('register', {error: error});
    } else if (registerError) {
        res.render('register', {
            error: registerError
        });

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
 * To do post method in Register page and to keep the details of the user: first name, last name and email in
 * the database
 * @param req
 * @param res
 */
exports.postRegister = async (req, res) => {
    const cookies = new Cookies(req, res, {keys: keys})
    const {firstName, lastName, email} = req.body;
    if(itsGoodData(firstName,lastName,email))
    {
        const data = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email.toLowerCase()
        }
        return db.Contact.findOne({where: {email: email.toLowerCase()}})
            .then((email) => {
                if (email) {
                    cookies.set('registerError', `${Messages[EMAILEXISTS]}`, {
                        signed: true,
                        maxAge: 1000
                    })
                    res.redirect('register')
                } else {
                    cookies.set('data', JSON.stringify(data), {signed: true, maxAge: 30 * 1000})
                    res.redirect('password')
                }

            })
            .catch((error) => {
                cookies.set('registerError', `${Messages[REGISTERPROBLEMWITHDATABASE]}`, {signed: true, maxAge: 1000})
                res.redirect('register');
            });
    }
    else
    {
        cookies.set('registerError', `${Messages[DATAPROBLEM]}`, {signed: true, maxAge: 1000})
        res.redirect('register');
    }
}

/**
 * To get Password Page
 * @param req
 * @param res
 */
exports.getPasswordPage = (req, res) => {
    const cookies = new Cookies(req, res, {keys: keys})
    let userData = cookies.get('data', {signed: true});
    const passwordError = cookies.get('passwordError')

    if(passwordError)
        res.render('password',{error: ""});
    else if (userData)
        res.render('password', {error: passwordError});
    else
        res.redirect('register');
}

/**
 * To post Password Page
 * @param req
 * @param res
 */
exports.postPassword = (req, res) => {
    const cookies = new Cookies(req, res, {keys: keys})
    const {password, confirmPassword} = req.body;

    let userData = cookies.get('data', {signed: true});
    if (userData) {
        let allData = JSON.parse(userData);
        if (itsGoodPassword(password, confirmPassword)) {
            return db.Contact.create({
                firstName: allData.firstName,
                lastName: allData.lastName,
                email: allData.email,
                password: password
            }).then((user) => {
                if (user) {
                    cookies.set('success', 'You have successfully registered to the site', {signed: true, maxAge: 1000})
                    res.redirect('/login')
                } else {
                    cookies.set('passwordError', `${Messages[PASSWORDPROBLEM]}`, {signed: true, maxAge: 1000})
                    res.redirect('/password');
                }

            })
                .catch((error) => {
                    cookies.set('registerError', `${Messages[REGISTERPROBLEMWITHDATABASE]}`, {
                        signed: true,
                        maxAge: 1000
                    })
                    res.redirect('register');
                });

        } else {
            cookies.set('passwordError', `${Messages[PASSWORDPROBLEM]}`, {signed: true, maxAge: 1000})
            res.redirect('/password');
        }
    } else {
        cookies.set('expired',`${Messages[EXPIRED]}` , {signed: true, maxAge: 1000})
        res.redirect('/password');
    }
}

/**
 * A function that checks if the password is the same as the confirmPassword, on the server side
 * @param password
 * @param confirmPassword
 * @returns {boolean}
 */
function itsGoodPassword(password, confirmPassword) {
    return (password === confirmPassword && password.length >= STRINGMINLENGTH &&  password.length <= STRINGMAXLENGTH)
}

/**
 * A function that checks the validity of the data of the user
 * @param firstName
 * @param lastName
 * @param email
 * @returns {boolean}
 */
function itsGoodData(firstName,lastName,email)
{
    return validateStr(firstName) && validateStr(lastName) && validateEmail(email)
}

/**
 * A function that checks the validity of the username ,on the server side
 * @param str
 * @returns {boolean}
 */
function validateStr(str) {
    const regex = /^[a-zA-Z]+$/;
    return (regex.test(str) && str.toString().length <= STRINGMAXLENGTH && str.toString().length >= STRINGMINLENGTH)
}

/**
 * A function that checks the validity of the email ,on the server side
 * @param str
 * @returns {boolean}
 */
function validateEmail(str) {
    const regex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return (regex.test(str) && str.toString().length <= STRINGMAXLENGTH && str.toString().length >= STRINGMINLENGTH)
}
