const express = require('express');
const router = express.Router();
const authController = require('../auth/authController')


const setUserRoute = require('../modules/Users/UserRoute');

setUserRoute(router);
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;