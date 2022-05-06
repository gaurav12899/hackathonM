import { Avatar } from "@mui/material";
import React, { useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import PublishIcon from '@mui/icons-material/Publish';
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import "./Post.css";
function Post(props) {
  // displayName,
  // username,
  // verified,
  // text,
  // image,
  // avatar,
  
  const [isLiked, setIsLiked] = useState({ state: true, number: "0" });

  const { title, description, tags, user } = props;

  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80" />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              { user?.displayName }{" "}
              <span className="post__headerSpecial">
                <VerifiedUserIcon className="post__badge" />
                @james@123
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            {
              //    console.log(props.data)
            }
            <p>
              {/* {props.data} */}
              what is wrong with this code. Can anyone please ans my question.
            </p>
          </div>
        </div>
        <img
          src="https://media.giphy.com/media/j5P0DQIOf4PonLi55G/giphy.gif"
          alt=""
        />
        <div className="post__footer">
          <ChatBubbleOutlineIcon fontSize="small" />
          {isLiked ? (
            <FavoriteBorderIcon
              fontSize="small"
              onClick={() => setIsLiked(!isLiked)}
            />
          ) : (
            <FavoriteIcon
              fontSize="small"
              onClick={() => setIsLiked(!isLiked)}
            />
          )}
          {/* <PublishIcon fontSize="small"/> */}
        </div>
      </div>
    </div>
  );
}

export default Post;
