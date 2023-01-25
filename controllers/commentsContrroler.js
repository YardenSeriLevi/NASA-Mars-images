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
exports.getComments = async(req, res) => {

    const {date} = req.query;
    const commentList = await db.Comment.findAll({
                    where: {date: date},
                    include: [{
                      model:  db.Contact,
                        attributes: ['firstName', 'lastName']
                    }]
                    });

    if (commentList !== null) {
        res.setHeader('Content-Type', 'application/json');
        res.json(commentList);
    }
    else {
        res.setHeader('Content-Type', 'application/json');
        res.json(commentList);

    }
};
/**
 *
 * @param req
 * @param res
 */
exports.postComment = async(req, res) => {
    let { date,txt } = req.body;
    // const commentList = await db.Comment.findAll({where: {date: date}});

    return db.Comment.create({
        user_id: req.session.user_id,
        comment: txt,
        date: date
    }).then(() => {
        res.json("good job")
    })
        .catch((err) => {
            if (err instanceof Sequelize.ValidationError)
                console.log(`Can not add the new comment to the database ${err} ${err.message}`);
            else
                console.log(`other error ${err}`);
        })
};
exports.deleteComment = async (req, res) => {
    const {date, id} = req.body;

    const del = await db.Comment.destroy({where: { date: date,id:id }});

   if(del)
       res.json("good job")
};

