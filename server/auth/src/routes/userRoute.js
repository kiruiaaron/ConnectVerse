const express = require('express')
const userRoute = express.Router();
const { register, login } = require('../contollers/userAuthController');
const newUserMiddleware = require('../middlewares/newUserMiddleware');
const { updateUser, getUser, getALLUsers, deleteUserAccount, followUser, unFollowUser } = require('../contollers/userOperationController');
const { sessionHandler } = require('../middlewares/SessionHandler');

userRoute.post('/register',newUserMiddleware,register)
userRoute.post('/login',login)

userRoute.use(sessionHandler)
userRoute.put('/update/:User_id',updateUser)
userRoute.get('/users/:UserName',getUser)
userRoute.get('/users',getALLUsers)
userRoute.delete('/user/:UserName',deleteUserAccount)
userRoute.post('/users/follow',followUser)
userRoute.post('/users/unfollow',unFollowUser)

module.exports =userRoute;