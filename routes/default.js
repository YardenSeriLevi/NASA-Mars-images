const express = require('express');

// load the controllers
const siteContactsController = require('../controllers/siteContacts');
const nasaController = require('../controllers/nasaContrroler');
const router = express.Router();

router.get('/',siteContactsController.getLoginPage)