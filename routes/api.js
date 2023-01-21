
const express = require('express');


// load the controllers
const comentsContrroler = require('../controllers/commentsContrroler');

const router = express.Router();

// router.get('/nasa',comentsContrroler.getComment)
// router.post('/nasa',comentsContrroler.postNasa)

module.exports = router;
