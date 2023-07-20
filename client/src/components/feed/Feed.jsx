import React, { useEffect, useState } from 'react'
import "./feed.css"
import Share from '../share/Share'
import Post from '../post/Post'
import { dummyPosts } from '../../assets/dummyData/posts'
import axios from 'axios'


export const Feed = () => {

const [posts,setPosts]= useState([]);

useEffect(()=>{
   const fetchPosts = async()=>{
     const res= await axios.get("http://localhost:8000/posts")
     const resData= await res.json();
      console.log(resData.results);
   }
   fetchPosts();
})

  return (
    <div className='feed'>
        <div className="feedwrapper">
            <Share/>
            {dummyPosts.map((post)=>(
               <Post key={post.id}  post={post}/>
            ))}
            
        </div>
    </div>
  )
}
