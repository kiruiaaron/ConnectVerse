import React, { useState } from "react";
import "./login.css";
import { Facebook, Google } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [UserName, setUserName] = useState();
  const [Password, setPassword] = useState();
  const [uError,setuError] = useState();
  const [pError,setPerror] = useState();


    
const navigate = useNavigate()
const handleSubmit= async(e) => {
  e.preventDefault();

  const values ={
    UserName,
    Password
  }
  try {
    await axios.post('http://localhost:7070/login',values)
    .then(res=>{
     navigate('/Home')
     //console.log(res.response.data.message)
    })
  } catch (error) {
    if(error.response.data.message === 'Invalid UserName' && error.response.data.message !== 'Wrong Password'){
      setuError(error.response.data.message)
      setPerror('')
    }
    else if(error.response.data.message !== 'Invalid UserName' && error.response.data.message === 'Wrong Password'){
      setPerror(error.response.data.message)
      setuError('')
    }
    else{
     
    }console.log(error.response.data.message)
   
  }

};

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginInside">
          <div className="loginWelcome">
            <div className="WelcomeLogo">
              <h1>ConnectVerse</h1>
            </div>
            <div className="welcomeText">
              <h1>Hey There!</h1>
              <p>Welcome Back.</p>
              <p>You are just one step away from your feed.</p>
            </div>
            <div className="accountCheck">
              <p>Don't have an Account</p>
              <button>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  Sign Up
                </Link>
              </button>
            </div>
          </div>
          <div className="loginForm">
            <h1>SIGN IN</h1>
            <form action="" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="UserName"
                className="loginFormInput"
                required
                value={UserName}
                onChange={e=>setUserName(e.target.value)}
              />
              <p className="error" style={{color:'red'}}>{uError? uError:''}</p>

              <input
                type="Password"
                placeholder="Password"
                className="loginFormInput"
                required
                value={Password}
                onChange={e=>setPassword(e.target.value)}
              />
              <p className="perror" style={{color:'red'}}>{pError}</p>

              <div className="checkPassword">
                <input type="Checkbox" className="loginChekbox" required />

                <label htmlFor="Checkbox" className="label">
                  Keep me Login
                </label>

                <p className="forgotPassword">Forgot Password</p>
              </div>
              <button className="loginFormSign">Sign In</button>
              <p className="loginPara">Or use the following to sign in </p>
              <div className="socialapp">
                <div className="facebook">
                  <Facebook className="facebook" />
                </div>
                <div className="google">
                  <Google className="google" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
