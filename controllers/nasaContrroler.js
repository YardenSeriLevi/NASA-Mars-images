var express = require('express');
var router = express.Router();
const Cookies = require('cookies')
const Sequelize = require('sequelize');
const db = require('../models');
const keys = ['keyboard cat']

/**
 * The user log out and goes to the login page
 * @param req
 * @param res
 */
exports.getLogOutPage = (req, res) => {
    req.session.login = false;
    res.redirect('/login')
};

/**
 * To get NASA page
 * @param req
 * @param res
 */
exports.getNasa = (req, res) => {
    if (req.session.login)
    {
        res.render('nasa',{userName:req.session.firstName+" " +req.session.lastName,
            userId:req.session.user_id })
    }
    else
        res.redirect('/login')

}

/**
 * To post NASA page
 * @param req
 * @param res
 */
exports.postNasa = (req, res) => {
    res.redirect('nasa')
}

