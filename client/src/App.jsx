
import { Home } from './components/pages/home/Home';
import { Profile } from './components/pages/profile/Profile';

import Homepage from "./components/pages/homepage/Homepage";
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import { Login } from './components/pages/homepage/login/Login';
import { Register } from './components/pages/homepage/register/Register';
// import { useContext } from 'react';
// import { AuthContext } from './context/AuthContext';


function App() {
  

  return (
   <Router>
    <Routes>
       <Route index path="/" element={<Homepage/>}/>
       <Route path="/login" element={ <Login/> }/>
       <Route path="/Home" element={<Home/>}/>
       <Route path="/register" element={<Register/>} /> 
       <Route path="/profile/:UserName" element={ <Profile/>}/>
    </Routes>
   </Router>
  );
}

export default App;
