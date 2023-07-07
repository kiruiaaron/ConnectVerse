const express = require('express')
const userRoute = express.Router();
const { register, login } = require('../contollers/userAuthController');
const newUserMiddleware = require('../middlewares/newUserMiddleware');

userRoute.post('/register',newUserMiddleware,register)
userRoute.post('/login',(req,res)=>{
    login
 req.session.User_id = user.User_id;
  req.session.username = user.UserName;

  // Send success response
  res.status(200).json({
    success: true,
    message: 'Login Successful',
    user: {
      username: user.username,
      email: user.email,
      // Add any other relevant user data
    },
  });
 
}
)



module.exports =userRoute;