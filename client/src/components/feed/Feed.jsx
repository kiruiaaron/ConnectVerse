import React from 'react'
import "./feed.css"
import Share from '../share/Share'
import Post from '../post/Post'


export const Feed = () => {
  return (
    <div className='feed'>
        <div className="feedwrapper">
            <Share/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
    </div>
  )
}
