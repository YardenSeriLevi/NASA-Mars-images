var express = require('express');
var router = express.Router();
const Cookies = require('cookies')
const keys = ['keyboard cat']


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.get('/', function(req, res, next) {
//   res.render('register', { firstName: "",lastName:"",email:"" });
// });
router.get('/', function(req, res, next) {
  res.render('login');
});


router.get('/register', function(req, res, next) {
  const cookies = new Cookies(req, res, { keys: keys })

  let userData = cookies.get('data', {signed: true});

  if(userData)
  {
    let allData = JSON.parse(userData);
    res.render('register', { firstName: allData.firstName,lastName :allData.lastName,email :allData.email });

  }
  else
  {
    console.log("in register in get")
    res.render('register', { firstName:"",lastName :"",email :""});
  }

  //res.redirect('register');
});


router.post('/login', function(req, res, next) {
  res.render('register', { title: 'Express' });

});

router.get('/password', function(req, res, next) {
  res.render('password');
});

router.post('/password', function(req, res, next) {
  const {firstName, lastName, email} = req.body;

  console.log("in password in post")

  const data = {
    "firstName": firstName,
    "lastName": lastName,
    "email": email
  }

  const cookies = new Cookies(req, res, { keys: keys })

  let userData = cookies.get('data', {signed: true});


  // if(userData)
  // {
  //   let allData = JSON.parse(userData);
  //   res.render('register', { firstName: allData.firstName,lastName :allData.lastName,email :allData.email });
  // }
  // else
  // {
  //   cookies.set('data', JSON.stringify(data), { signed: true, maxAge: 30*1000})
  //   res.render('register', { firstName:"",lastName :"",email :"" });
  // }
  if(userData)
  {
    let allData = JSON.parse(userData);
    res.redirect('password')
  }
  else
  {
    console.log("in password in post in else")
    cookies.set('data', JSON.stringify(data), { signed: true, maxAge: 5*1000})
    res.redirect('password')
  }
  //if email exist:
  // do somthing whith cockies and send beck
  //res.render('register', { title: 'Express' });

  //if email does not exist add continue ling that will take us to password page
});


module.exports = router;
