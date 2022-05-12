import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import PublishIcon from '@mui/icons-material/Publish';
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import "./Post.css";
import Parser from "html-react-parser";
import axios from "axios";
import { useSelector } from "react-redux";
import { login, logout, selectUser } from "../../feature/userSlice";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextField from "@mui/material/TextField";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post(props) {
  const [isLiked, setIsLiked] = useState({ state: true, number: "0" });
  const [expanded, setExpanded] = React.useState(false);
  const [ loading, setLoading ] = useState(false);
  const { title, description, tags, user, image, postId, likes, comments, OnLike, inputshowin, input, onComment, getPosts } = props;
  const AuthUser = useSelector(selectUser);
  const [comment, setComment] = useState('');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onLikeChange = async (like) => {
    if (loading) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setLoading(true);
    await axios
      .post("/api/like/liketoggle", { postId, userId: AuthUser.uid }, config)
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
    setIsLiked({ ...isLiked, like: !isLiked.like });
  };

  const onCommentLikeChange = async (commentId) => {

    if (loading) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setLoading(true);
    axios
        .post("/api/postCommentLike/liketoggle", {commentId, userId: AuthUser.uid}, config)
        .then((res) => {
          if (onComment) {
            let commentsList = comments.map((rec) => {
              if (rec._id == commentId) {
                rec['likes'] = res.data.response.likes;
              }
              return rec;
            });
            onComment(commentsList);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    // setIsLiked({...isLiked, like: !isLiked.like});
  }

  const handlechange = (e) => {
    setComment(e.target.value);
  }

  const addComment = () => {
    if(comment !== ""){
      handleCommentappi();
    }
  }

  const handleCommentappi = () => {
    const data = {
      userId: user.uid,
      postId: postId,
      comment: comment
    }
    axios.post("/api/postComment/", data).then((res) => {
      // setPosts(res.data.reverse());
      getPosts();
      setComment("");
    }).then((res) => {
      // setPosts(res.data);
      console.log("res", res);
    });
  }


  return (
    <>
      <Card sx={{ Width: "100%", boxShadow: 5, marginBottom: 3}}>
        <CardHeader sx={{ padding: '0px' }}
          avatar={
            <div className="post__avatar">
              <Avatar
                src={
                  user?.photo ||
                  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80"
                }
              />
            </div>
          }
          title={user?.displayName || "Anonymous"}
          subheader={ user?.email }
        />
        <CardMedia
          component="img"
          height="500"
          src={`http://localhost:3000/${image}`}
          alt="img"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <b>
              <h2>{title}</h2>
            </b>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
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
            ({likes.length})
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{Parser(description)}</Typography>
          </CardContent>
        </Collapse>
      </Card>
  
    <div className="post__footer">
          <ChatBubbleOutlineIcon fontSize="small" onClick={() => inputshowin(postId)} />
          ({ comments.length })
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

        {
          comments.map((commentRecord) => {
            return <>
              <span>{ commentRecord.comment }</span> ({ commentRecord['likes']?.length })
              {commentRecord['likes']?.indexOf(AuthUser.uid) > -1 ? (
                <FavoriteIcon
                  fontSize="small"
                  onClick={() => onCommentLikeChange(commentRecord._id)}
                />
              ) : (
                <FavoriteBorderIcon
                  fontSize="small"
                  onClick={() => onCommentLikeChange(commentRecord._id)}
                />
              )}
              <br />
            </>;
          })
        }

        {input &&
            <TextField 
              id="skill1" 
              label="Enter comment" 
              variant="outlined"
              name="comment"
              value={comment}
              onChange={handlechange}
            />
          }
          <Button onClick={() => addComment()}>ADD Comments</Button>
      {/* </div>
    </div> */}
    </>
    // <div className="post">
    //   <div className="post__avatar">
    //     <Avatar src={ user?.photo || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80"} />
    //   </div>
    //   <div className="post__body">
    //     <div className="post__header">
    //       <div className="post__headerText">
    //         <h3>
    //           { user?.displayName || 'Anonymous' }{" "}
    //           <span className="post__headerSpecial">
    //             <VerifiedUserIcon className="post__badge" />
    //             @{ user?.email }
    //           </span>
    //         </h3>
    //       </div>
    //       <div className="post__headerDescription">
    //         {
    //           //    console.log(props.data)
    //         }
    //         <p>
    //           {/* {props.data} */}
    //           <b><h1>{title}</h1></b>
    //         <img
    //           src={`http://localhost:3000/${image}`}
    //           width={"80%"}
    //           height={"auto"}
    //           className="post__image"
    //           alt="image"
    //         />
    //         { Parser(description) }
    //         </p>
    //       </div>
    //     </div>
    //     <div className="post__footer">
    //       {/* <ChatBubbleOutlineIcon fontSize="small" /> */}
    //       {likes?.indexOf(AuthUser.uid) > -1 ? (
    //         <FavoriteIcon
    //           fontSize="small"
    //           onClick={() => onLikeChange(false)}
    //         />
    //       ) : (
    //         <FavoriteBorderIcon
    //           fontSize="small"
    //           onClick={() => onLikeChange(true)}
    //         />
    //       )}
    //       ({ likes.length })
    //       {/* <PublishIcon fontSize="small"/> */}
    //     </div>
    //   </div>
    // </div>
  );
}

export default Post;
