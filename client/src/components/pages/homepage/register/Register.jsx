import React, { useEffect, useState } from "react";
import "./register.css";
import { Facebook, Google } from "@mui/icons-material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//import PhoneInput from 'react-phone-number-input'
import "../homepage.css";
import { Top } from "../login/Top";
import {Visibility, VisibilityOff} from '@mui/icons-material'


export const Register = () => {
  const [countryState, setCountryState] = useState({
    loading: false,
    countries: [],
    error_message: "",
  });

  useEffect(() => {
    const countryData = async () => {
      try {
        setCountryState({
          ...countryState,
          loading: true,
        });

        const dataUrl = "https://restcountries.com/v3.1/all";
        const res = await axios.get(dataUrl);

        setCountryState({
          ...countryState,
          countries: res.data,
          loading: false,
        });
      } catch (error) {
        setCountryState({
          loading: false,
          ...countryState,
          error_message: "Internal server error",
        });
      }
    };
    countryData();
  }, []);

  const { loading, error_message, countries } = countryState;
  console.log(countries);

  const [country, setCountry] = useState();

  console.log(country);

  //selected country data

  const searchSelectedCountry = countries.find((obj) => {
    if (obj.name.common === country) {
      return true;
    } else {
      return false;
    }
  });

  console.log(searchSelectedCountry);

  const [FirstName, setFirstName] = useState();
  const [Surname, setSurname] = useState();
  const [UserName, setUserName] = useState();
  const [Gender, setGender] = useState();
  const [Email_Address, setEmail] = useState();
  const [Phone_Number, setPhoneNumber] = useState();
  const [Date_of_birth, setDateOfBirth] = useState();
  const [Password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [userNameError,setUserNameError]= useState();
  const [passError,setPassError] = useState()
  const [emailError,setEmailError]= useState();
  const [isVisible, setIsVisible] = useState(false)

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const values = {
      FirstName,
      Surname,
      UserName,
      Gender,
      Email_Address,
      country,
      Phone_Number,
      Date_of_birth,
      Password,
      confirmPassword,
    };
     if(Password === confirmPassword){
      try {
        await axios.post("http://localhost:7070/register", values).then((res) => {
          navigate("/");
          //console.log(res.response.data.message)
        });
      } catch (error) {
        console.log(error.response.data.message);
        if(error.response.data.message === 'Username already exists'&& error.response.data.message !== 'Email already exists'){
                setUserNameError(error.response.data.message)
        }
        else if(error.response.data.message !== 'Username already exists'&& error.response.data.message === 'Email already exists'){
          setEmailError(error.response.data.message)
        }
      }
     }else{
      setPassError('Password Do not Match')
     }
   
  };

  return (
    <div>
      <Top />
      <div className="home">
        <div className="register">
          <div className="registerWrapper">
            <div className="registerInside">
              <div className="registerWelcome">
                <div className="regWelcomeLogo">
                  <h1>ConnectVerse</h1>
                </div>
                <div className="regwelcomeText">
                  <h1>Hey There!</h1>
                  <p>Welcome to Home of Fun and Connect.</p>
                  <p>You are just one step away from your feed.</p>
                </div>
                <div className="regAccountCheck">
                  <p>Already have an Account</p>
                  <button>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Sign In
                    </Link>
                  </button>
                </div>
              </div>
              <div className="registerForm">
                <h1>SIGN UP</h1>
                <form action="" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="FirstName"
                    className="registerFormInput"
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />

                  <input
                    type="text"
                    placeholder="Surname"
                    className="registerFormInput"
                    value={Surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                  />
                  

                  <input
                    type="text"
                    placeholder="UserName"
                    className="registerFormInput"
                    value={UserName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                  <p className="error" style={{color:'red'}}>{userNameError}</p>

                  <select
                    name="Gender"
                    id=""
                    className="registerFormInputGender"
                    placeholder="select Gender"
                    value={Gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">--Select Gender--</option>

                    <option value="Male" className="registerFormInput">
                      Male
                    </option>
                    <option value="Female" className="registerFormInput">
                      Female
                    </option>
                  </select>

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="registerFormInput"
                    value={Email_Address}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className="error" style={{color:'red'}}>{emailError}</p>

                  <div className="countryFlagInput">
                    <img
                      src={searchSelectedCountry?.flags.png}
                      alt=""
                      className="flag"
                    />

                    <select
                      name="country"
                      id=""
                      className="registerFormInputCountry"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    >
                      <option value="country">--Select Country--</option>
                      {countries.map((item) => {
                        return (
                          <option value={item.name.common}>
                            {item.name.common}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    {searchSelectedCountry && (
                      <div className="phoneNumberDiv">
                        <div className="phoneNumber">
                        <p className="phoneRaw">
                          {searchSelectedCountry?.idd.root}
                          {searchSelectedCountry?.idd.suffixes}
                        </p>
                        </div>
                        <div>
                        <input
                          type="text"
                          placeholder="Phone_Number"
                          className="registerFormInputPhone"
                          value={Phone_Number}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                        />
                        </div>
                      
                      </div>
                    )}
                  </div>

                  <input
                    type="date"
                    placeholder="Date of Birth"
                    className="registerFormInput"
                    value={Date_of_birth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                  />

                  <div className="passwordInput">
                  <input
                    type={isVisible? "text" :'password'}
                    placeholder="Password"
                    className="registerFormInputPassword"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div onClick={()=>setIsVisible(!isVisible)}>
                  {isVisible? <Visibility className="visibilityIcon"/>: <VisibilityOff/>}
                  </div>
                  </div>
                

                  <div className="passwordInput">
                  <input
                    type={isVisible? "text" :'password'}
                    placeholder="Password"
                    className="registerFormInputPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <div onClick={()=>setIsVisible(!isVisible)}>
                  {isVisible? <Visibility className="visibilityIcon"/>: <VisibilityOff/>}
                  </div>
                  </div>
                  <p className="error" style={{color:'red'}}>{passError}</p>

                  <button className="registerFormSign" type="submit">
                    Sign Up
                  </button>

                  <p className="registerPara">
                    Or use the following to sign up
                  </p>

                  <div className="regsocialapp">
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
      </div>
    </div>
  );
};
