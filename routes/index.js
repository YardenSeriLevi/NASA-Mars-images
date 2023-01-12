var express = require('express');
var router = express.Router();
const Cookies = require('cookies')
const db = require('../models');
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
router.get('/login', function(req, res, next) {
  res.render('login');
});


router.get('/register', function(req, res, next) {
  const cookies = new Cookies(req, res, { keys: keys })

  const error = cookies.get('expired')
  let userData = cookies.get('data', {signed: true});

  if (error){
    console.log("error")
    res.render('register', { firstName: '',lastName :'',email :'' ,error: error});
  }


  else if(userData)
  {
    let allData = JSON.parse(userData);
    res.render('register', { firstName: allData.firstName,lastName :allData.lastName,email :allData.email ,error:""});

  }
  else
  {
    res.render('register', { firstName:"",lastName :"",email :"",error:""});
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
    cookies.set('data', JSON.stringify(data), { signed: true, maxAge: 5*1000})
    res.redirect('password')
  }
});

router.post('/nasa', function(req, res, next) {
  const cookies = new Cookies(req, res, { keys: keys })

  let userData = cookies.get('data', {signed: true});
  if(userData)
  {
    console.log("in post nasaa ")
    res.render('nasa', { title: 'Express' });
  }

  else
  {
    cookies.set('expired', 'expired', { signed: true, maxAge: 1000})
    res.redirect('/register');

  }

});

module.exports = router;
