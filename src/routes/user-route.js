// Import express
const express = require('express')

const userRoutes = require('../controllers/user-controller.js')

// Create router
const router = express.Router()

router.get('/all', userRoutes.userAll)

router.post('/create', userRoutes.userCreate)

router.delete('/delete', userRoutes.userDelete)

router.get('/usuario', userRoutes.userByUsuario)

router.put('/login', userRoutes.userLogin)

router.put('/changepassword', userRoutes.userChangePassword)

router.put('/resetpassword', userRoutes.userResetPassword)


// Export router
module.exports = router