var express = require('express');
var router = express.Router();
const Cookies = require('cookies')
const keys = ['keyboard cat']


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  res.render('register', { firstName: "",lastName:"",email:"" });
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
  const {firstName, lastName, email} = req.body;

  const data = {
    "firstName": firstName,
    "lastName": lastName,
    "email": email
  }

  const cookies = new Cookies(req, res, { keys: keys })

  let userData = cookies.get('data', {signed: true});


  if(userData)
  {
    let allData = JSON.parse(userData);
    res.render('register', { firstName: allData.firstName,lastName :allData.lastName,email :allData.email });
  }
  else
  {
    cookies.set('data', JSON.stringify(data), { signed: true, maxAge: 30*1000})
    res.render('register', { firstName:"",lastName :"",email :"" });
  }








  //if email exist:
  // do somthing whith cockies and send beck
  res.render('register', { title: 'Express' });

  //if email does not exist add continue ling that will take us to password page
});


module.exports = router;
