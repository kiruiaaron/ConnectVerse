import React from "react";
import "./post.css";
import person from "../../assets/images/sparkle-specialist-fortnite-1ep8lz1hna7q9rkr.jpg";
import { MoreVert } from "@mui/icons-material";
import like from '../../assets/images/like.png'
import heart from '../../assets/images/heart.png'

const Post = () => {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src={person} alt="" />

            <span className="postUserName">Kirui Aron</span>
            <span className="postDate">5 mins ago</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>

        <div className="postCenter">
            <span className="postText">Hey It's my first post</span>
            <img src={person} alt="" className="postImg"/>
        </div>
        <div className="postBottom">
            <div className="postBottomLeft">
                <img src={like} alt="" className="like" />
                <img src={heart} alt="" className="heart" />
                <span className="postLikeCounter">32 people like it</span>
            </div>
            <div className="postBottomRight">
                <span className="commentText"> 9 comments</span>
            </div>  
        </div>
      </div>
    </div>
  );
};

export default Post;
