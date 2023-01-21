
const express = require('express');


// load the controllers
const siteContactsController = require('../controllers/siteContacts');
const nasaController = require('../controllers/nasaContrroler');

const router = express.Router();

router.get('/',siteContactsController.getLoginPage)

router.get('/login',siteContactsController.getLoginPage)

router.post('/login',siteContactsController.postLogin)

router.get('/register',siteContactsController.getRegisterPage)

router.post('/register',siteContactsController.postRegister)

router.get('/password',siteContactsController.getPasswordPage)

router.post('/password',siteContactsController.postPassword)


router.get('/logOut',nasaController.getLogOutPage)

router.get('/nasa',nasaController.getNasa)
router.post('/nasa',nasaController.postNasa)

module.exports = router;
