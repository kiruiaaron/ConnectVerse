import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import profile from '../../assets/images/avatar.png'
import './replies.css'
import { AuthContext } from '../../context/AuthContext'
import { Reply, Send } from '@mui/icons-material'

const Replies = ({comment}) => {

    const {currentUser} = useContext(AuthContext)
    const[Reply_text,setReply_text] = useState()

    const[replies,setReplies] = useState([])
    const{Replied_by_id,setReplyId}= useState(currentUser.User_id)
    const[Comment_id,setCommentID] = useState(comment.Comment_id)
    const[showReplyInput,setShowReplyInput] = useState(false)




    useEffect(()=>{
        const fetchReplies=async()=>{
          const res= await axios.get(`http://localhost:8000/posts/comments/replies/${comment.Comment_id}`,{withCredentials:true})
          setReplies(res.data.result)
          console.log(res.data.result)
        }
        fetchReplies()
      },[])

      const handleReplySubmit=async(e)=>{
             e.preventDefault()

             const values ={
                Replied_by_id,
                Comment_id,
                Reply_text
             }


             try {
                await axios.post("http://localhost:8000/posts/comment/reply",values,{withCredentials:true})
             } catch (error) {
                console.log(error)
             }
      }


      const handleshowReplyInput=()=>{
        setShowReplyInput(!showReplyInput)
      }

  return (
    <div className='replyReplies'>
      
               <div>
               <div className='ReplyIcon'>
               <Reply onClick={handleshowReplyInput}/>
               <p>Reply</p>
               </div>
                 {showReplyInput &&(
                   
                   <div className="eplytInput">
                   <div className="CommentProfile">
                   <img src={currentUser?.Profile_Image || profile} alt="" className="CommentprofileImg" />
                   <div>{currentUser?.UserName}</div>
                   </div>
                   <div className="CommentInputText">
                   <input type="text" className="ReplyInputTextInside" value={Reply_text} onChange={(e)=>setReply_text(e.target.value)}/>
                   </div>
                   <div className="sendInputreply">
                    <button type="submit" onClick={handleReplySubmit}>
                    <Send className="sendREPLY"/>
                    send
                    </button>
                   </div>
                 </div>
                 )}
                        </div>
       <div className='CommentRepliesWrapper'>
          <div className='replyUser'>
             <img className='CommentprofileImg' src={comment.Profile_Image || profile} alt="" />
             <p>{comment.UserName}</p>
          </div>
          <div className='replyInput'>
            {replies.Reply_text}
          </div>
       </div>
    </div>
  )
}

export default Replies