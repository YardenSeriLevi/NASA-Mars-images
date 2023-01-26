var express = require('express');
var router = express.Router();
const Cookies = require('cookies')
const Sequelize = require('sequelize');
const db = require('../models');
const keys = ['keyboard cat']
let errors = ['Incorrect username or password, or you are not registered on the site. Please try again', 'Can not login right now, please try again later']

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
    else if (req.session.login) {
        cookies.set('userName',)
        res.redirect('nasa');
    } else
        res.render('login', {success: "", error: ""});
};

/**
 * To post login page and check if the user exist in the data base
 * @param req
 * @param res
 */
exports.postLogin = async (req, res) => {
    const cookies = new Cookies(req, res, {keys: keys})
    const {email, password} = req.body;
    // const user = await db.Contact.findOne({where: {email: email, password: password}});
    return  db.Contact.findOne({where: {email: email, password: password}})
    .then((user) =>
{
    if (user !== null) {
        req.session.login = true;
        req.session.firstName = user.firstName;
        req.session.user_id  = user.id;
        req.session.lastName = user.lastName;
        res.redirect('nasa');
    } else {
        cookies.set('errorLogin', 'Incorrect username or password, or you are not registered on the site. Please try again', {signed: true, maxAge: 1000})
        res.redirect('login');
    }
    // res.setHeader('Content-Type', 'application/json');
    // res.json(commentList)
})
    .catch((error)=>
    {
        cookies.set('errorLogin', 'Can not login right now, please try again later', {signed: true, maxAge: 1000})
        res.redirect('login');
        // res.status = 400;
        // res.error = error;
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
    const emailError = cookies.get('emailExistError')
    let userData = cookies.get('data', {signed: true});

    if (error) {
        res.render('register', {error: error});
    } else if (emailError) {
        res.render('register', {
            error: emailError
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
 * To post Register page and to keep the details of the user: first name, last name and email in
 * the data base
 * @param req
 * @param res
 */
exports.postRegister = async (req, res) => {
    try {
        const cookies = new Cookies(req, res, {keys: keys})
        const {firstName, lastName, email} = req.body;
        const data = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email
        }

        const user = await db.Contact.findOne({where: {email: email}})
        if (user) {
            cookies.set('emailExistError', 'This email already exist, please register with another one', {
                signed: true,
                maxAge: 1000
            })
            res.redirect('register')
        } else {
            cookies.set('data', JSON.stringify(data), {signed: true, maxAge: 30 * 1000})
            res.redirect('password')
        }

    } catch (err) {

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

    if (userData)
        res.render('password');
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
        if (password === confirmPassword) {
            return db.Contact.create({
                firstName: allData.firstName,
                lastName: allData.lastName,
                email: allData.email,
                password: password
            }).then(() => {
                cookies.set('success', 'You have successfully registered to the site', {signed: true, maxAge: 1000})
                res.redirect('/login')
            })
                .catch((err) => {
                    if (err instanceof Sequelize.ValidationError)
                        console.log(`validation error ${err}`);
                    else
                        console.log(`other error ${err}`);
                })
        } else {
            cookies.set('expired', 'Registration process expired,please start again', {signed: true, maxAge: 1000})
            res.redirect('/register');
        }

    }

}



