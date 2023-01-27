
const express = require('express');

// load the controllers
const commentsController = require('../controllers/commentsController');

const router = express.Router();

router.use(commentsController.redirect);

router.get('/comment',commentsController.getComments)
router.post('/comment',commentsController.postComment)
router.delete('/comment',commentsController.deleteComment)

module.exports = router;
