const express = require('express');
const router = express.Router();
const passport = require('../../config/passport');

const authControllerAPI = require('../../controllers/api/authControllerAPI');

router.post('/authenticate', authControllerAPI.authenticate);
router.post('/forgotPassword', authControllerAPI.forgotPassword);
router.post('/facebook_token', passport.authenticate('facebook-token'), authControllerAPI.authFacebookToken);

module.exports = router;