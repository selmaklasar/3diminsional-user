const express = require('express');
const authController = require('../controllers/auth-controller');
const passport = require('../libs/passport');

const router = express.Router();

router.route('/login').post(authController.login);

router.route('/register').post(authController.registerUser);


router.route('/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/google/callback').get(authController.loginOrRegisterWithGoogle);

router.route('/refresh-token').post(authController.refreshToken);

module.exports = router;
