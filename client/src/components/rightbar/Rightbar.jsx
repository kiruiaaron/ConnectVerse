import React from 'react'
import './rightbar.css'
import avatar from '../../assets/images/avatar.png'
//import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Rightbar = ({profile}) => {


const ProfileRightbar=()=>{
    return (
    <>
    <h4 className='rightbarTitle'>User Information</h4>
    <div className="rightbarInfo">
      <div className="rightbarInfoItem">
        <span className='rightbarInfoKey'>City:</span>
        <span className='rightbarInfoValue'>New York</span>
      </div>
      <div className="rightbarInfoItem">
        <span className='rightbarInfoKey'>From:</span>
        <span className='rightbarInfoValue'>United States</span>
      </div>
      <div className="rightbarInfoItem">
        <span className='rightbarInfoKey'>Relationship:</span>
        <span className='rightbarInfoValue'>Married</span>
      </div>
    </div>
    <h4 className='rightbarTitle'>User Followers</h4>
    <div className="rightbarFollowings">
      <div className="rightbarFollowing">
        <img src={avatar} alt="" className="rightbarFollowingImg" />
        <span className='rightbarFollowingName'>Kirui Perez</span>
      </div>
      <div className="rightbarFollowing">
        <img src={avatar} alt="" className="rightbarFollowingImg" />
        <span className='rightbarFollowingName'>Kirui Perez</span>
      </div>
      <div className="rightbarFollowing">
        <img src={avatar} alt="" className="rightbarFollowingImg" />
        <span className='rightbarFollowingName'>Kirui Perez</span>
      </div>
      <div className="rightbarFollowing">
        <img src={avatar} alt="" className="rightbarFollowingImg" />
        <span className='rightbarFollowingName'>Kirui Perez</span>
      </div>
      <div className="rightbarFollowing">
        <img src={avatar} alt="" className="rightbarFollowingImg" />
        <span className='rightbarFollowingName'>Kirui Perez</span>
      </div>
      <div className="rightbarFollowing">
        <img src={avatar} alt="" className="rightbarFollowingImg" />
        <span className='rightbarFollowingName'>Kirui Perez</span>
      </div>
      <div className="rightbarFollowing">
        <img src={avatar} alt="" className="rightbarFollowingImg" />
        <span className='rightbarFollowingName'>Kirui Perez</span>
      </div>
      <div className="rightbarFollowing">
        <img src={avatar} alt="" className="rightbarFollowingImg" />
        <span className='rightbarFollowingName'>Kirui Perez</span>
      </div>
    </div>
    </>
  
    )
}


  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
      <ProfileRightbar/>
      </div>
    </div>
  )
}
