import React from 'react'
import './profile.css'
import Topbar from '../../topbar/topbar'
import Sidebar from '../../sidebar/Sidebar'
import { Rightbar } from '../../rightbar/Rightbar'
import { Feed } from '../../feed/Feed'
import coverImg from '../../../assets/images/user8.jpg'
import profile from '../../../assets/images/user6.jpg'

export const Profile = () => {
  return (
    <div> 
     <Topbar/>
    <div className="profile">
    <Sidebar/>
    <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
            <img className='ProfileCoverImg' src={coverImg} alt="" />
            <img className='profileImg' src={profile} alt="" />
          
        </div>
        <div className="profileInfo">
            <h4 className='profileInfoName'>Kirui Aron</h4>
            <span className='profileInfoDesc'>hello my friends</span>
        </div>
        </div> 
        <div className="profileRightBottom">
        <Feed/>
        < Rightbar profile/>
        </div>
    </div>
    </div>
    </div>
  )
}
