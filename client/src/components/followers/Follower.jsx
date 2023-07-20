import React from 'react'
import './Follower.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Follower = ({user}) => {
  return (
    <li className='sidebarFollower' >
    <img className='sidebarFollowerImg' src={(user.profile_picture)?"":<AccountCircleIcon/>} alt="" />
    <span className='sidebarFollowerName'>{user.username}</span>
</li>
  )
}

export default Follower