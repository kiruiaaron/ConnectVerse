import React from 'react'
import birthday from '../../assets/images/happy-birthday-red-ribbon-xu3l1yac5usshox3.jpg'
import { dummyUsers } from '../../assets/dummyData/users'
import Online from '../online/online'
import ad from '../../assets/images/skol-beer-yellow-background-t77545i6iup75ao3.jpg'
import './rightbar.css'
import '../pages/home/home.css'

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

export default HomeRightBar