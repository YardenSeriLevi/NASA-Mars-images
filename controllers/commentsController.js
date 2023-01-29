var express = require('express');
const Sequelize = require('sequelize');
const db = require('../models');
/**
 * Redirect to login page
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
        .catch(() => setError(res));
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
        .catch(() => setError(res));
};

/**
 * To delete the comments from the database
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.deleteComment = async (req, res) => {
    const {date, id} = req.body;
    return db.Comment.destroy({where: {date: date, id: id}})
        .then(() => {
            res.json("Good Job")
        })
        .catch(() => setError(res));
};

/**
 * function that return error status to the client
 * @param res
 */
function setError(res)
{
    res.status = 400;
    res.json("not good");
}