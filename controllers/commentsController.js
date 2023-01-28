var express = require('express');
const Sequelize = require('sequelize');
const db = require('../models');
// var express = require('express');
var router = express.Router();
const Cookies = require('cookies')
// const Sequelize = require('sequelize');
// const db = require('../models');
const keys = ['keyboard cat']

/**
 *
 * @type {exports.redirect}
 */
exports.redirect = ((req, res, next) => {
    if (!(req.session.login))
        res.redirect('/login')
    next()
})

/**
 * To get the comments from the database
 * @param req
 * @param res
 */
exports.getComments = async (req, res) => {
    const {date} = req.query;
    return db.Comment.findAll({
        where: {date: date},
        include: [{
            model: db.Contact,
            attributes: ['firstName', 'lastName']
        }]
    }).then((commentList) => {
        res.setHeader('Content-Type', 'application/json');
        res.json(commentList)
    })
        .catch((error) => {
            res.status = 400;
            res.error = error;
        });
};

/**
 * To post the comments to the database
 * @param req
 * @param res
 */
exports.postComment = async (req, res) => {
    let {date, txt} = req.body;
    return db.Comment.create({
        user_id: req.session.user_id,
        comment: txt,
        date: date
    }).then(() => {
        res.json("Good Job")
    })
        .catch((err) => {
            if (err instanceof Sequelize.ValidationError)
                console.log(`Can not add the new comment to the database, ${err} ${err.message}`);
            else
                console.log(`other error ${err}`);
        })
};

/**
 * To delete the comments from the database
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.deleteComment = async (req, res) => {
    const {date, id} = req.body;
    const del = await db.Comment.destroy({where: {date: date, id: id}});
    if (del)
        res.json("Good Job")
};


