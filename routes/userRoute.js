const express = require('express');
const { 
    createUser, loginUser, updateUser, getAllUser, deleteUser, logout
 } = require('../controller/userController');
const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/user/:id')
                        .put(updateUser)
                        .delete(deleteUser)

router.route('/user').get(getAllUser);
router.route('/logout').get(logout);


module.exports = router;