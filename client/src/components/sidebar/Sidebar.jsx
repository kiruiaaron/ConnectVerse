import React from 'react'
import './sidebar.css'
import { Bookmark, Event, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline } from '@mui/icons-material'
import john from '../../assets/images/hurk-drubman-jr-far-cry-4-hd-phone-akhsppp06864dyau.jpg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        
        <div className='sidebarWrapper'>
           <ul className='sidebarList'>
           <li className=' '>
                 <RssFeed className='sidebarIcon'/>
                 <span className='sidebarListItem'>Feed</span>
           </li>
           <li className='sidebarListItem'>
                 <PlayCircleFilledOutlined className='sidebarIcon'/>
                 <span className='sidebarListItem'>Videos</span>
           </li>
           <li className='sidebarListItem'>
                 <Group className='sidebarIcon'/>
                 <span className='sidebarListItem'>Groups</span>
           </li>
           <li className='sidebarListItem'>
                 <Bookmark className='sidebarIcon'/>
                 <span className='sidebarListItem'>Bookmarks</span>
           </li>
           <li className='sidebarListItem'>
                 <HelpOutline className='sidebarIcon'/>
                 <span className='sidebarListItem'>Questions</span>
           </li>
           <li className='sidebarListItem'>
                 <RssFeed className='sidebarIcon'/>
                 <span className='sidebarListItem'>Feed</span>
           </li>
           <li className='sidebarListItem'>
                 <WorkOutline className='sidebarIcon'/>
                 <span className='sidebarListItem'>Jobs</span>
           </li>
           <li className='sidebarListItem'>
                 <Event className='sidebarIcon'/>
                 <span className='sidebarListItem'>Events</span>
           </li>
           <li className='sidebarListItem'>
                 <School className='sidebarIcon'/>
                 <span className='sidebarListItem'>Courses</span>
           </li>
           </ul>
           <button className='sidebarButton'>Show More</button>
           <hr className='sidebarhr'/>
           <ul className='sidebarFollowersList' >
            <li className='sidebarFollower' >
                 <img className='sidebarFollowerImg' src={john} alt="" />
                 <span className='sidebarFollowerName'>John Doe</span>
            </li>
            <li className='sidebarFollower' >
                 <img className='sidebarFollowerImg' src={john} alt="" />
                 <span className='sidebarFollowerName'>John Doe</span>
            </li>
            <li className='sidebarFollower' >
                 <img className='sidebarFollowerImg' src={john} alt="" />
                 <span className='sidebarFollowerName'>John Doe</span>
            </li>
            <li className='sidebarFollower' >
                 <img className='sidebarFollowerImg' src={john} alt="" />
                 <span className='sidebarFollowerName'>John Doe</span>
            </li>
           </ul>
        </div>
        </div>
  )
}

export default Sidebar