import React, { useState } from 'react'
import { Login } from './login/Login'
import { Top } from './login/Top'
import './homepage.css'
//import { Register } from './register/Register'

const Homepage = () => {

  return (
    <div>
        <Top/>
        <div className="home">
        <Login/>
        </div>
    </div>
  )
}

export default Homepage