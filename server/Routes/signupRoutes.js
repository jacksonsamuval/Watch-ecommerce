const express = require('express')
const {registerUser, loginUser} = require('../Controllers/signupCtrl')

const signUpRouter = express.Router()

signUpRouter.post('/',registerUser)
signUpRouter.post('/login',loginUser)

module.exports = signUpRouter;