import React, { useContext, useEffect, useState } from 'react'
import './rightbar.css'
import avatar from '../../assets/images/avatar.png'
//import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import birthday from '../../assets/images/happy-birthday-red-ribbon-xu3l1yac5usshox3.jpg'
import { dummyUsers } from '../../assets/dummyData/users'
import Online from '../online/online'
import ad from '../../assets/images/skol-beer-yellow-background-t77545i6iup75ao3.jpg'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { Add, Remove } from '@mui/icons-material'


export const Rightbar = ({user}) => {
const [friends,setFriends] = useState([]);
const {currentUser} = useContext(AuthContext)
const [followed,setFollowed] = useState(false);


console.log(user)
useEffect(()=>{
  const getFriends = async()=>{
    try {
      const friendlist= await axios.get(`http://localhost:7070/users/followers/${user?.User_id}`,{withCredentials:true})
       setFriends(friendlist.data.results);
       console.log(friendlist.data.results)

    } catch (error) {
       console.log(error)
    }
  } 
  getFriends()
},[user?.User_id])


const handleClick =async()=>{
    try {
      if(followed){
        await axios.post("")
      }
    } catch (error) {
      console.log(error)
    }
}


  const HomeRightBar=()=>{
    return(
      <>
        <div className="birthdayContainer">
            <img className='birthdayImg' src={birthday} alt="" />
            <span className='birthdayText'>
              {" "}
              <b>Posta Foster</b> and<b>other friends </b>3  have birthday today
            </span>
          </div>
        <img className='rightbarAd' src={ad} alt="" />
        <h4 className='rightbarTitle'>Online Followers</h4>
        <ul className='rightbarFollowersList'>
           {dummyUsers.map((u)=>(
            <Online key={u.id} user={u}/>
           ))}
        </ul> 
      </>
    )
  }


const ProfileRightbar=()=>{





    return (
    <>

    <h4 className='rightbarTitle'>User Followers</h4>
    <div className="rightbarFollowings">

      {
      
      friends?.length > 0 ?(

      friends.map((friend)=>(

        <Link to={`/profile/${friend.UserName}`} style={{textDecoration:'none'}}>
          <div className="rightbarFollowing">
           <img src={friend.Profile_Image||avatar} alt="" className="rightbarFollowingImg" />
          <span className='rightbarFollowingName'>{friend.UserName}</span>
        </div></Link>
    

      ))):''}
    
    </div>
    </>
  
    )
}


  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
      {user?<ProfileRightbar/>:<HomeRightBar/>}
      </div>
    </div>
  )
}
