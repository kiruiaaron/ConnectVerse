import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import { Facebook, Google } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import {Visibility, VisibilityOff} from '@mui/icons-material'
//import { loginCall } from "../../../../apiCalls";
import { AuthContext } from "../../../../context/AuthContext";
//import { CircularProgress } from "@mui/material";

export const Login = () => {
  const [isVisible,setIsVisible] = useState(false)
  const[pError,setPerror] = useState()
const [Password,setPassword] = useState()
const[UserName,setUserName]= useState();

  const [err, setErr] = useState(null);

  const navigate = useNavigate()


  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputs={
      UserName,
      Password
    }
    try {
      await login(inputs);
      navigate("/Home")
    } catch (err) {
      console.log(err)
      setPerror('Wrong Credentials')
      setErr(err.response.data);
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
                value={UserName}
                required
                onChange={(e)=>setUserName(e.target.value)}
              />
              
              <div className="LoginpasswordInput">
                  <input
                    type={isVisible? "text" :'password'}
                    placeholder="Password"
                    className="registerFormInputPassword"
                    value={Password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                  />
                  <div onClick={()=>setIsVisible(!isVisible)}>
                  {isVisible? <Visibility className="visibilityIcon"/>: <VisibilityOff/>}
                  </div>
                  </div>
              <p className="perror" style={{color:'red'}}>{pError}</p>

              <div className="checkPassword">
                <input type="Checkbox" className="loginChekbox" required />

                <label htmlFor="Checkbox" className="label">
                  Keep me Login
                </label>

                <p className="forgotPassword">Forgot Password</p>
              </div>
              <button className="loginFormSign" type="submit"  >
           Sign In
             </button>
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


