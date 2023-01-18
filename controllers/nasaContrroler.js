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
exports.getNasa = (req, res) => {

    const cookies = new Cookies(req, res, {keys: keys})

    if (req.session.login)
        res.render('nasa',userName:)
}

exports.postNasa = (req, res) => {

    res.redirect('nasa')
}

