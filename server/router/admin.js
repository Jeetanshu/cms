const express = require('express');
const adminOptions = require('../controllers/admin.js');

const router = express.Router();

router.get('/getusers', adminOptions.getUsers);
router.patch('/updateuserinfo/:id', adminOptions.updateUserInfo);
router.patch('/updatepassword/:id', adminOptions.updatePassword);
router.post('/createuser', adminOptions.createUser);
router.delete('/deleteuser/:id', adminOptions.deleteUser);

module.exports = router;