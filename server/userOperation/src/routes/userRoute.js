const express = require('express');
const { updateUser, getUser, getALLUsers, deleteUserAccount, followUser, unFollowUser } = require('../controllers/userOperationController');
const userRoute = express.Router();


userRoute.put('/update/:User_id',updateUser)
userRoute.get('/users/:UserName',getUser)
userRoute.get('/users',getALLUsers)
userRoute.delete('/user/:UserName',deleteUserAccount)
userRoute.post('/users/follow',followUser)
userRoute.post('/users/unfollow',unFollowUser)


module.exports = userRoute