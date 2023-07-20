import React from 'react'
import Topbar from '../../topbar/topbar'
import Sidebar from '../../sidebar/Sidebar'
import { Feed } from '../../feed/Feed'
import { Rightbar } from '../../rightbar/Rightbar'
import './home.css'
//import HomeRightBar from '../../rightbar/HomeRightbar'

export const Home = () => {
  return (
    <div>
        <Topbar/>
        <div className="homeContainer">
        <Sidebar/>
        <Feed/>
        <Rightbar/>
        </div>
       
    </div>
  )
}
