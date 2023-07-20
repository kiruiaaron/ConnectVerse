import React from 'react'
 import './online.css'

const Online = ({user}) => {
  return (
   <li className="rightbarFollower">
     <div className="rightbarProfileImgContainer">

<img className='rightbarProfileImg' src={user.profile_picture} alt="" />
 <span className='rightbarOnline'></span>
</div>
 <span className='rightbarUsername'>{user.username}</span>
   </li>
  )
}

export default Online