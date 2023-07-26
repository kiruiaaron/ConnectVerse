import React, { useContext } from 'react'
import  './topbar.css'
import {Chat, Notifications, Person, Search} from "@mui/icons-material"
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import profile from '../../assets/images/avatar.png'

const Topbar = () => {


const {currentUser} =useContext(AuthContext)

const navigate = useNavigate()

const handleLogout=()=>{
   localStorage.removeItem('user')
   navigate('/')
}


  return (
    <div className='topbarContainer'>
        <div className='topbarLeft'>
            <Link to="/home" style={{textDecoration:"none"}}>
            <span className='logo'>ConnectVerse</span>
            </Link>
            
        </div>
        <div className='topbarCenter'>
            <div className='searchbar '>
                <Search/>
                <input type="text" 
                placeholder='search for friend, post or video'
                className="searchInput" />
            </div>
        </div>
        <div className='topbarRight'>
            <div className="topbarLinks">
                <span className="topbarLink">
                    Homepage
                </span>  
                <span className="topbarLink">
                    Timeline
                </span> 
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className='topbarIconBadge'>1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat/>
                        <span className='topbarIconBadge'>2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className='topbarIconBadge'>1</span>
                    </div>
                    <div className='logoutButton'>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            
                <Link to={`/profile/${currentUser?.UserName}`}>
                <img src={currentUser?.Profile_Image || profile} alt="" className='topbarImage'/>
                </Link>
               
        </div>
    </div>
  )
}

export default Topbar