var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  res.render('register', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});


router.post('/login', function(req, res, next) {
  res.render('register', { title: 'Express' });


});

router.get('/password', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.post('/password', function(req, res, next) {

  //if email exist:
  // do somthing whith cockies and send beck
  res.render('register', { title: 'Express' });

  //if email does not exist add continue ling that will take us to password page
});


module.exports = router;
