import React, { useContext, useEffect, useState } from "react";
import "./post.css";
import { InsertComment, MoreVert, Reply, Send, Share, ThumbUp } from "@mui/icons-material";
import Like from '../../assets/images/like.png';
import heart from '../../assets/images/heart.png';
import profile from '../../assets/images/avatar.png';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Replies from "./Replies";

const Post = ({ post }) => {
  const [user, setUser] = useState({});
  const {currentUser } = useContext(AuthContext);
  const [updatedPost, setUpdatedPost] = useState(post);
  const [isLiking, setIsLiking] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comments,setComments] = useState([]);
  const [Comment_Text,setComment_Text] = useState()
  const [Post_id,setPostId]=useState(post.Post_id);
  const[User_id,setUserId] = useState(currentUser.User_id)



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:7070/users/${post.UserName}`, { withCredentials: true });
        setUser(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [post.UserName]);

  const convertToCustomFormat = (isoDateString) => {
    const dateObject = new Date(isoDateString);
    const year = dateObject.getUTCFullYear();
    const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getUTCDate().toString().padStart(2, '0');
    const hours = dateObject.getUTCHours().toString().padStart(2, '0');
    const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
    const seconds = dateObject.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = dateObject.getUTCMilliseconds().toString().padStart(3, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}000`;
  };

  const handleLike = async () => {
    if (isLiking) {
      return;
    }

    try {
      setIsLiking(true);
      const response = await axios.post(`http://localhost:8000/posts/${post.Post_id}/likePost`, {
        User_id: currentUser.User_id,
      },{withCredentials:true});
      //console.log(response)
      setUpdatedPost(response.data);
      setIsLiking(false);
    } catch (error) {
      console.log(error);
      setIsLiking(false);
    }
  };

const handleComments=()=>{
  setShowCommentInput(!showCommentInput);
}


useEffect(()=>{
  const fetchComments=async()=>{
   // console.log(post.Post_id)
    try {
      const res= await axios.get(`http://localhost:8000/posts/comments/${post.Post_id}`,{withCredentials:true})
      //console.log(res);
      setComments(res.data.result)
    } catch (error) {
      console.log(error)
      
    }
 
  }
  fetchComments()
},[post.Post_id])

const handleCommmentSubmit=async(e)=>{
    e.preventDefault()

    const values={
      User_id,
      Post_id,
      Comment_Text
    }

    try {
       await axios.post("http://localhost:8000/posts/comment",values,{withCredentials:true})
       setComment_Text('')
    } catch (error) {
      console.log(error)
    }
}





  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${post.UserName}`} style={{ textDecoration: "none" }}>
                <img className="postProfileImg" src={post.Profile_Image || profile} alt="" />
              </Link>
              <Link to={`/profile/${post.UserName}`} style={{ textDecoration: "none" }}>
                <span className="postUserName">{post.UserName}</span>
              </Link>
              <span className="postDate">{format(convertToCustomFormat(post.Created_at))}</span>
            </div>
            <div className="postTopRight">
              <MoreVert />
            </div>
          </div>

          <div className="postCenter">
            <span className="postText">{post.Written_text}</span>
            <img src={post.Image_url} alt="" className="postImg" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                src={updatedPost.isLiked ? heart : Like}
                alt=""
                className={updatedPost.isLiked ? "heart" : "like"}
                onClick={handleLike}
                style={{ pointerEvents: isLiking ? 'none' : 'auto' }}
              />
              <span className="postLikeCounter">{updatedPost.Like_count} people {updatedPost.isLiked ? 'like' : 'liked'} it</span>
            </div>
            <div className="postBottomRight">
              <span className="commentText"> {post.Comment_count} comments</span>
            </div>
            
          </div>
          <hr className="postBottomCenterhr" />
          <div className="postBottomCenter">
            <div className="thumb"><ThumbUp className="thumbUp"/> Like</div>
            <div className="comment" onClick={handleComments}> <InsertComment className="insertComment"/> Comment</div>
            <div className="Share"><Share className="Shareicon"/> Share</div>    
            </div>
            <hr className="postBottomCenterhr" />
            <div className="CommentSection">
             
                       <div className="commentWrapper">
                       {showCommentInput && (
                       <div className="CommentInput">
                         <div className="CommentProfile">
                         <img src={currentUser?.Profile_Image || profile} alt="" className="CommentprofileImg" />
                         <div>{currentUser?.UserName}</div>
                         </div>
                         <div className="CommentInputText">
                         <input type="text" className="CommentInputTextInside" value={Comment_Text} onChange={(e)=>setComment_Text(e.target.value)}/>
                         </div>
                         <div className="sendInputComment">
                          <button type="submit" onClick={handleCommmentSubmit}>
                          <Send className="send"/>
                          send
                          </button>
                         </div>
                       </div>
                       )}
                  
                 {comments?.map((comment)=>(
                   <div>
                    <div className="allcomments">
                        <div>
                          <img src={comment.Profile_Image || profile} alt="" className="CommentprofileImg"/>
                          <p>{comment.UserName}</p>
                        </div>
                        <div className="otherCommentsInput">
                          {comment.Comment_Text}
                        </div>


                    </div>
                    <Replies key={comment.Comment_id} comment={comment}/>
                   </div>
                 ))}
                
                 </div>
              
            
            </div>
        </div>
      </div>
    </>
  );
};

export default Post;
