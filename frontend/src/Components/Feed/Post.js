import { Avatar } from "@mui/material";
import React, { useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import PublishIcon from '@mui/icons-material/Publish';
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import "./Post.css";
import Parser from 'html-react-parser';
import axios from "axios";
import { useSelector } from "react-redux";
import { login, logout, selectUser } from "../../feature/userSlice";

function Post(props) {
  
  const [isLiked, setIsLiked] = useState({ state: true, number: "0" });
  const [ loading, setLoading ] = useState(false);
  const { title, description, tags, user, image, postId, likes, comments, OnLike } = props;
  const AuthUser = useSelector(selectUser);

  const onLikeChange = async (like) => {

    if (loading) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setLoading(true);
    await axios
        .post("/api/like/liketoggle", {postId, userId: AuthUser.uid}, config)
        .then((res) => {
          // debugger;
          console.log("like------------>>>", res.data);
          if (OnLike) {
            OnLike(res.data.response);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    setIsLiked({...isLiked, like: !isLiked.like});
  }

console.log("image", image);
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src={ user?.photo || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80"} />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              { user?.displayName || 'Anonymous' }{" "}
              <span className="post__headerSpecial">
                <VerifiedUserIcon className="post__badge" />
                @{ user?.email }
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            {
              //    console.log(props.data)
            }
            <p>
              {/* {props.data} */}
              <b>{title}</b>
            { Parser(description) }
            </p>
          </div>
        </div>
        <img
          src={`http://localhost:3000/${image}`}
          width={200}
          height={200}
          alt="image"
        />
        <div className="post__footer">
          <ChatBubbleOutlineIcon fontSize="small" />
          {likes?.indexOf(AuthUser.uid) > -1 ? (
            <FavoriteIcon
              fontSize="small"
              onClick={() => onLikeChange(false)}
            />
          ) : (
            <FavoriteBorderIcon
              fontSize="small"
              onClick={() => onLikeChange(true)}
            />
          )}
          ({ likes.length })
          {/* <PublishIcon fontSize="small"/> */}
        </div>
      </div>
    </div>
  );
}

export default Post;
