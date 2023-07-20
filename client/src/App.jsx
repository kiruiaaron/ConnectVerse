
import { Home } from './components/pages/home/Home';
import { Profile } from './components/pages/profile/Profile';

import Homepage from "./components/pages/homepage/Homepage";
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import { Login } from './components/pages/homepage/login/Login';
import { Register } from './components/pages/homepage/register/Register';

function App() {
  return (
   <Router>
    <Routes>
       <Route index path="/" element={<Homepage/>}>
       </Route>
       <Route path="/login" element={ <Login/> }>
       </Route>
       <Route path="/Home" element={ <Home/> }>
       </Route>
       <Route path="/register" element={ <Register/>}> 
       </Route>
       <Route path="/profile/:UserName" element={<Profile/>}>
       </Route>
    </Routes>
   </Router>
  );
}

export default App;
