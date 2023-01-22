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
 */
exports.getLogOutPage = (req, res) => {

    req.session.login = false;
    res.redirect('/login')
};

/**
 *
 * @param req
 * @param res
 */
exports.getNasa = (req, res) => {

    if (req.session.login)
    {
        res.render('nasa',{userName:req.session.userName})

    }
    else
    {
        res.redirect('/login')

    }
}

exports.postNasa = (req, res) => {

    res.redirect('nasa')
}

