import React, { useState } from "react";
import "./post.css";
import { MoreVert } from "@mui/icons-material";
import Like from '../../assets/images/like.png'
import heart from '../../assets/images/heart.png'
import { dummyUsers } from "../../assets/dummyData/users"; 

const Post = ({post}) => {
  const [like, setLike] = useState(post.likes);
  const [isLiked,setIsLiked]=useState(false)

  const likeHandler=()=>{
    setLike(isLiked? like-1:like+1)
    setIsLiked(!isLiked)
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src={dummyUsers.filter(u=>u.id===post?.userId)[0].profile_picture} alt="" />

          <span className="postUserName">{dummyUsers.filter(u=>u.id===post?.userId)[0].username}
          </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>

        <div className="postCenter">
            <span className="postText">{post?.text}</span>
            <img src={post?.photo} alt="name" className="postImg"/>
        </div>
        <div className="postBottom">
            <div className="postBottomLeft">
                <img src={Like} alt="" className="like" onClick={likeHandler} />
                <img src={heart} alt="" className="heart" onClick={likeHandler} />
                <span className="postLikeCounter">{like} people like it</span>
            </div>
            <div className="postBottomRight">
                <span className="commentText"> {post.comments} comments</span>
            </div>  
        </div>
      </div>
    </div>
  );
};

export default Post;
