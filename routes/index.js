
const express = require('express');

// load the controllers
const siteContactsController = require('../controllers/siteContacts');
const nasaController = require('../controllers/nasaContrroler');
const router = express.Router();

router.use(siteContactsController.redirect);

router.use(siteContactsController.preventCashing);

router.get('/',siteContactsController.getLoginPage)

router.route('/login')
    .get(siteContactsController.getLoginPage)
    .post(siteContactsController.postLogin)

router.route('/register')
    .get(siteContactsController.getRegisterPage)
    .post(siteContactsController.postRegister)

router.route('/password')
    .get(siteContactsController.getPasswordPage)
    .post(siteContactsController.postPassword)

router.get('/logOut',nasaController.getLogOutPage)

router.route('/nasa')
    .get(nasaController.getNasa)
    .post(nasaController.postNasa)

module.exports = router;
