const express = require ('express')
const router = express.Router();
const cors = require('cors')
const { test, registerUser, loginUser, logoutUser, getProfile } = require('../controllers/authController')



router.get('/',test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser);
router.get('/profile',getProfile)

module.exports = router