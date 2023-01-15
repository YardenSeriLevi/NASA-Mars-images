
const express = require('express');


// load the controllers
const siteContactsController = require('../controllers/siteContacts');

const router = express.Router();

router.get('/',siteContactsController.getLoginPage)

router.get('/login',siteContactsController.getLoginPage)

router.post('/login',siteContactsController.postLogin)

router.get('/register',siteContactsController.getRegisterPage)

router.get('/password',siteContactsController.getPasswordPage)

router.post('/password',siteContactsController.postPassword)

router.post('/nasa',siteContactsController.postNasa)

module.exports = router;
