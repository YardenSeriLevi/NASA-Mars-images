
const express = require('express');

// load the controllers
const comentsContrroler = require('../controllers/commentsContrroler');

const router = express.Router();

router.get('/comment',comentsContrroler.getComments)
router.post('/comment',comentsContrroler.postComment)
router.delete('/comment',comentsContrroler.deleteComment)

module.exports = router;
