var express = require('express');
var router = express.Router();
const Cookies = require('cookies')
const Sequelize = require('sequelize');
const db = require('../models');
const keys = ['keyboard cat']

// const bodyParser = require('body-parser');
//
// router.use(bodyParser.json());

// 'use strict';

// this is how we use the Contact class from models
// const Comment = require('../models/comments.js');

/**
 *
 * @param req
 * @param res
 */
exports.getComments = async(req, res) => {

    const { date} = req.query;
    const commentList = await db.Comment.findAll({
                    where: {date: date},
                    include: [{
                      model:  db.Contact,
                        attributes: ['firstName', 'lastName']
                    }]
                    });

    //res.setHeader('Content-Type', 'application/json');
        // res.json(commentList);
    if (commentList !== null) {
        res.setHeader('Content-Type', 'application/json');
        res.json(commentList);
    }
    else {
        res.setHeader('Content-Type', 'application/json');
        res.json(commentList);

    }

    // const list = db.getComment()
    // const filteredList = list.filter((comment) => comment.date === date);
    // res.status(200);
    // res.setHeader('Content-Type', 'application/json');
    // res.json(filteredList);
};

// router.get('/comment', (req, res) => {
//     const { date} = req.query;
//     const list = dbList.getComment()
//     const filteredList = list.filter((comment) => comment.date === date);
//     res.status(200);
//     res.setHeader('Content-Type', 'application/json');
//     res.json(filteredList);
// });

/**
 *
 * @param req
 * @param res
 */
exports.postComment = async(req, res) => {
    const { date, user,txt } = req.body;
    const commentList = await db.Comment.findAll({where: {date: date}});
    const newId = commentList.length + 1;

    return db.Comment.create({
        identity: newId,
        date: date,
        //userName: user,
        user_id: req.session.user_id,
        comment: txt
    }).then(() => {
        res.json("good job")
    })
        .catch((err) => {
            if (err instanceof Sequelize.ValidationError)
                console.log(`couldent add the new comment to the database ${err}`);
            // one possible error is that the phone is missing, check the model files for more details
            else
                console.log(`other error ${err}`);
        })
};
// router.post('/comment', (req, res) => {
//     const { date, user,txt } = req.body;
//     const newId = dbList.getComment().length + 1;
//     let newComment = new Comment(newId, date, user, txt);
//     dbList.addComment(newComment);
//     res.json("good job")
// });
//
exports.deleteComment = async (req, res) => {
    const {date, id} = req.body;

    const del = await db.Comment.destroy({where: { date: date,identity:id }});

   if(del)
       res.json("good job")
};
// router.delete('/comment', (req, res) => {
//     const { date, id} = req.body;
//     dbList.deleteComment(date,id);
//     res.json("good job")
// });
//
//module.exports = router;

