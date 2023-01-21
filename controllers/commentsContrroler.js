// var express = require('express');
// var router = express.Router();
// const Cookies = require('cookies')
// const Sequelize = require('sequelize');
// const db = require('../models');
// const keys = ['keyboard cat']
//
// const bodyParser = require('body-parser');
//
// router.use(bodyParser.json());
//
// 'use strict';
//
// // this is how we use the Contact class from models
// const Comment = require('../models/comment.js');
//
// // using a commentList module to handle a contact list
// const dbList = require('../models/commentlist.js');
//
// /**
//  * GET method
//  */
// router.get('/comment', (req, res) => {
//     const { date} = req.query;
//     const list = dbList.getComment()
//     const filteredList = list.filter((comment) => comment.date === date);
//     res.status(200);
//     res.setHeader('Content-Type', 'application/json');
//     res.json(filteredList);
// });
//
// /**
//  * POST method
//  */
// router.post('/comment', (req, res) => {
//     const { date, user,txt } = req.body;
//     const newId = dbList.getComment().length + 1;
//     let newComment = new Comment(newId, date, user, txt);
//     dbList.addComment(newComment);
//     res.json("good job")
// });
//
// /**
//  * DELETE method
//  */
// router.delete('/comment', (req, res) => {
//     const { date, id} = req.body;
//     dbList.deleteComment(date,id);
//     res.json("good job")
// });
//
// module.exports = router;
//
