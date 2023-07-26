import React, { useContext, useEffect, useState } from 'react'
import "./feed.css"
import Share from '../share/Share'
import Post from '../post/Post'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'


export const Feed = ({ UserName}) => {

const [posts,setPosts]= useState([]);
const {currentUser} = useContext(AuthContext)

useEffect(()=>{
   const fetchPosts = async()=>{
    try {
      const res= 
      UserName? await axios.get(`http://localhost:8000/posts/${UserName}`,{withCredentials:true})
      :await axios.get(`http://localhost:8000/posts`,{withCredentials:true})

      console.log(res.data.result);
      setPosts(res.data.result.sort((p1,p2)=>{
        return new Date(p2.Created_at)- new Date(p1.Created_at);
      }))
    } catch (error) {
       console.log(error)
    }
    
   }
   fetchPosts();
},[UserName])

  return (
    <div className='feed'>
        <div className="feedwrapper">
            {(!UserName || UserName === currentUser?.UserName) &&<Share/>}
            {
              posts.map((p)=>(
                <Post key={p.Post_id} post={p}/>
              ))
            }
            
        </div>
    </div>
  )
}
