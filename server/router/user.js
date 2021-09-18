const express = require('express');
const userOptions = require('../controllers/user.js');

const router = express.Router();

router.post('/login', userOptions.logIn);
router.post('/signup', userOptions.signUp)
router.get('/getuser/:id', userOptions.getUser);
router.patch('/uploadprofilepic/:id', userOptions.uploadProfilePic);
router.patch('/updateuserinfo/:id', userOptions.updateUserInfo);

module.exports = router;